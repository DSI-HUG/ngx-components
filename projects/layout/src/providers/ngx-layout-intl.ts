import { Injectable } from '@angular/core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxLayoutIntl {

    private static readonly DEFAULT_LOCALE = 'en-US';
    private static readonly ERR_TEXT = '**ERR-MISSING-TRANSLATION**';

    public closeLabel = '';
    public backLabel = '';
    public sideFilterLabel = '';

    async init(localeId: string, filesPath: string): Promise<NgxLayoutIntl> {
        console.log('Initializing NgxLayoutIntl with locale', localeId, 'and files path', filesPath);
        return this.loadFromFile(localeId, filesPath)
            .catch(async err => {
                console.warn(`Failed to get the translation file for requested locale ${localeId}. Fallback to default ${NgxLayoutIntl.DEFAULT_LOCALE} locale.`, err);
                try {
                    return await this.loadFromFile(NgxLayoutIntl.DEFAULT_LOCALE, filesPath);
                } catch (fallbackErr) {
                    console.error(`Failed to get the translation file for default locale ${NgxLayoutIntl.DEFAULT_LOCALE}. Check that you correctly import the files in your project.`, fallbackErr);
                    return undefined;
                }
            })
            .then(intl => {
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
                        (this as unknown as Record<string, string>)[key] = NgxLayoutIntl.ERR_TEXT;
                    }
                });

                return this;
            });
    }

    private async loadFromFile(localeId: string, filesPath: string): Promise<NgxLayoutIntl> {
        return await fetch(`${filesPath}/${localeId}.json`)
            .then(file => file.json())
            .then((fileJson: NgxLayoutIntl) => fileJson);
    }
}
