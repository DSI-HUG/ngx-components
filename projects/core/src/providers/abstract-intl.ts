import { EnvironmentProviders, inject, LOCALE_ID, provideAppInitializer, Type } from '@angular/core';

export const provideNgxIntl = <T extends NgxAbstractIntl<T>>(filesPath: string, type: Type<T>): EnvironmentProviders =>
    provideAppInitializer(() => {
        const localeId = inject(LOCALE_ID);
        return inject(type).init(localeId, filesPath, type);
    });

/**
 * Data for internationalization
 */

export abstract class NgxAbstractIntl<T extends NgxAbstractIntl<T>> {

    private static readonly DEFAULT_LOCALE = 'en-US';
    private static readonly ERR_TEXT = '**ERR-MISSING-TRANSLATION**';

    async init(localeId: string, filesPath: string, type: Type<T>): Promise<this> {
        // console.log('Initializing intl with locale', localeId, 'and files path', filesPath);
        const intl = await this.loadFromFile(localeId, filesPath)
            .catch(async err => {
                console.warn(`Failed to get the translation file for requested locale ${localeId}. Fallback to default ${NgxAbstractIntl.DEFAULT_LOCALE} locale.`, err);
                try {
                    return await this.loadFromFile(NgxAbstractIntl.DEFAULT_LOCALE, filesPath);
                } catch (fallbackErr) {
                    console.error(`Failed to get the translation file for default locale ${NgxAbstractIntl.DEFAULT_LOCALE}. Check that you correctly import the files in your project.`, fallbackErr);
                    return undefined;
                }
            });

        // Whitelist to prevent other keys from JSON files
        const whitelistKeys = new Set(Object.keys(new type()));

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

    private async loadFromFile(localeId: string, filesPath: string): Promise<T> {
        return await fetch(`${filesPath}/${localeId}.json`)
            .then(file => file.json())
            .then((fileJson: T) => fileJson);
    }
}
