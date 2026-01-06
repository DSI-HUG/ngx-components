import { EnvironmentProviders, inject, LOCALE_ID, makeEnvironmentProviders, provideAppInitializer, Type } from '@angular/core';

export interface NgxOptionsIntl<T> {
    translationsPath?: string;
    customIntl?: Type<T>;
}

export const provideNgxIntl = <T extends NgxAbstractIntl<T>>(
    intl: Type<T>,
    translationsPath: string,
    customIntl: Type<T>,
    retryCount = 3,
    retryDelayInMs = 10
): EnvironmentProviders =>
    makeEnvironmentProviders([
        { provide: intl, useClass: customIntl },
        provideAppInitializer(() => {
            const localeId = inject(LOCALE_ID);
            return inject(intl).init(localeId, translationsPath, retryCount, retryDelayInMs);
        })
    ]);

/**
 * Data for internationalization
 */

export abstract class NgxAbstractIntl<T extends NgxAbstractIntl<T>> {

    private static readonly DEFAULT_LOCALE = 'en-US';

    private static readonly FALLBACKS = new Map<string, string>([
        ['en', NgxAbstractIntl.DEFAULT_LOCALE],
        ['fr', 'fr-CH'],
        ['de', 'de-CH']
    ]);

    private static readonly ERR_TEXT = '**ERR-MISSING-TRANSLATION**';

    async init(localeId: string, translationsPath: string, retryCount: number, retryDelayInMs: number): Promise<this> {
        console.debug('Initializing intl with locale', localeId, 'and path', translationsPath, ' (retry', retryCount, 'times with', retryDelayInMs, 'ms of delay)');
        const intl = await this.loadFromFile(localeId, translationsPath, retryCount, retryDelayInMs)
            .catch(async err => {
                const fallbackLocaleId = localeId.includes('-') ?
                    NgxAbstractIntl.FALLBACKS.get(localeId.substring(0, 2)) ?? NgxAbstractIntl.DEFAULT_LOCALE :
                    NgxAbstractIntl.DEFAULT_LOCALE;
                console.warn(`Failed to get the translation file for requested locale ${localeId}. Fallback to ${fallbackLocaleId} locale.`, err);
                try {
                    return await this.loadFromFile(fallbackLocaleId, translationsPath, retryCount, retryDelayInMs);
                } catch (fallbackErr) {
                    console.error(`Failed to get the translation file for fallback locale ${fallbackLocaleId}. Check that you correctly import the files in your project.`, fallbackErr);
                    return undefined;
                }
            });

        // Whitelist to prevent other keys from JSON files
        const whitelistKeys = new Set(Object.keys(this));

        if (intl) {
            Object.keys(intl).forEach(key => {
                // If whitelisted + not overridden entry
                if (whitelistKeys.has(key) && !(this as unknown as Record<string, string>)[key]) {
                    // Let's assign the value from JSON file
                    (this as unknown as Record<string, string>)[key] = (intl as unknown as Record<string, string>)[key];
                }
            });
        }

        // Search for missing translations
        whitelistKeys.forEach(key => {
            if (!(this as unknown as Record<string, string>)[key]) {
                // Assign error constant to highlight the missing entry
                (this as unknown as Record<string, string>)[key] = NgxAbstractIntl.ERR_TEXT;
            }
        });

        return this;
    }

    private async loadFromFile(localeId: string, translationsPath: string, retryCount: number, retryDelayInMs: number): Promise<T> {
        return await fetch(`${translationsPath}/${localeId}.json`)
            .then(file => file.json())
            .then((fileJson: T) => fileJson)
            .catch(async err => {
                if (retryCount > 0) {
                    console.log(`Failed to fetch the translation file for locale ${localeId} at path ${translationsPath}. Let's retry (${retryCount} attempts left) in ${retryDelayInMs} milliseconds.`);
                    return this.sleep(retryDelayInMs)
                        .then(() => this.loadFromFile(localeId, translationsPath, retryCount - 1, retryDelayInMs));
                }
                throw err;
            });
    }

    private async sleep(delayInMs: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, delayInMs));
    }
}
