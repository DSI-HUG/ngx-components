import { MatDateFormats } from '@angular/material/core';

import { buildNgxMatDateFormatsFactory } from './date-format.provider';

describe('NgxDateFormatProvider', () => {
    const localeFrCh = 'fr-CH'; // French CH
    const localeItCh = 'it-CH'; // Italian CH
    const localeDeCh = 'de-CH'; // Deutsch CH
    const localeEnUs = 'en-US'; // English US
    const localeEs = 'es'; // Spanish
    const localePl = 'pl'; // Polish
    const localeSv = 'sv'; // Swedish

    const standardMonthYearLabel = 'MMM yyyy';
    const standardDateA11yLabel = 'LL';
    const standardMonthYearA11yLabel = 'MMMM yyyy';

    const isEqualsTo = (factory: (localeId: string) => MatDateFormats, localeId: string, expected: MatDateFormats): void => {
        expect(factory(localeId)).withContext(localeId).toEqual(expected);
    };

    it('When yearOnly should build MatDateFormats correctly', () => {
        const factory = buildNgxMatDateFormatsFactory('yearOnly');

        const standardExpected: MatDateFormats = {
            parse: {
                dateInput: 'yyyy'
            },
            display: {
                dateInput: 'yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        isEqualsTo(factory, localeFrCh, standardExpected);
        isEqualsTo(factory, localeItCh, standardExpected);
        isEqualsTo(factory, localeDeCh, standardExpected);
        isEqualsTo(factory, localeEnUs, standardExpected);
        isEqualsTo(factory, localeEs, {
            parse: {
                dateInput: 'yyyy'
            },
            display: {
                dateInput: 'yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: 'MMMM de yyyy'
            }
        });
        isEqualsTo(factory, localePl, standardExpected);
        isEqualsTo(factory, localeSv, standardExpected);
    });

    it('When monthYearOnly should build MatDateFormats correctly', () => {
        const factory = buildNgxMatDateFormatsFactory('monthYearOnly');

        const standardExpected: MatDateFormats = {
            parse: {
                dateInput: 'MM.yyyy'
            },
            display: {
                dateInput: 'MM.yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        const englishExpected: MatDateFormats = {
            parse: {
                dateInput: 'MM/yyyy'
            },
            display: {
                dateInput: 'MM/yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        isEqualsTo(factory, localeFrCh, standardExpected);
        isEqualsTo(factory, localeItCh, englishExpected);
        isEqualsTo(factory, localeDeCh, standardExpected);
        isEqualsTo(factory, localeEnUs, englishExpected);
        isEqualsTo(factory, localeEs, {
            parse: {
                dateInput: 'MM/yyyy'
            },
            display: {
                dateInput: 'MM/yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: 'MMMM de yyyy'
            }
        });
        isEqualsTo(factory, localePl, standardExpected);
        isEqualsTo(factory, localeSv, {
            parse: {
                dateInput: 'yyyy-MM'
            },
            display: {
                dateInput: 'yyyy-MM',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
    });

    it('When short should build MatDateFormats correctly', () => {
        const factory = buildNgxMatDateFormatsFactory('short');

        const standardExpected: MatDateFormats = {
            parse: {
                dateInput: 'dd.MM.yyyy'
            },
            display: {
                dateInput: 'dd.MM.yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        isEqualsTo(factory, localeFrCh, standardExpected);
        isEqualsTo(factory, localeItCh, standardExpected);
        isEqualsTo(factory, localeDeCh, standardExpected);
        isEqualsTo(factory, localeEnUs, {
            parse: {
                dateInput: 'MM/dd/yyyy'
            },
            display: {
                dateInput: 'MM/dd/yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
        isEqualsTo(factory, localeEs, {
            parse: {
                dateInput: 'dd/MM/yyyy'
            },
            display: {
                dateInput: 'dd/MM/yyyy',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: 'MMMM de yyyy'
            }
        });
        isEqualsTo(factory, localePl, standardExpected);
        isEqualsTo(factory, localeSv, {
            parse: {
                dateInput: 'yyyy-MM-dd'
            },
            display: {
                dateInput: 'yyyy-MM-dd',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
    });

    it('When long should build MatDateFormats correctly', () => {
        const factory = buildNgxMatDateFormatsFactory('long');

        const standardExpected: MatDateFormats = {
            parse: {
                dateInput: 'dd.MM.yyyy, HH:mm'
            },
            display: {
                dateInput: 'dd.MM.yyyy, HH:mm',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        isEqualsTo(factory, localeFrCh, {
            parse: {
                dateInput: 'dd.MM.yyyy HH:mm'
            },
            display: {
                dateInput: 'dd.MM.yyyy HH:mm',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
        isEqualsTo(factory, localeItCh, standardExpected);
        isEqualsTo(factory, localeDeCh, standardExpected);
        isEqualsTo(factory, localeEnUs, {
            parse: {
                dateInput: 'MM/dd/yyyy, HH:mm'
            },
            display: {
                dateInput: 'MM/dd/yyyy, HH:mm',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
        isEqualsTo(factory, localeEs, {
            parse: {
                dateInput: 'dd/MM/yyyy, HH:mm'
            },
            display: {
                dateInput: 'dd/MM/yyyy, HH:mm',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: 'MMMM de yyyy'
            }
        });
        isEqualsTo(factory, localePl, standardExpected);
        isEqualsTo(factory, localeSv, {
            parse: {
                dateInput: 'yyyy-MM-dd HH:mm'
            },
            display: {
                dateInput: 'yyyy-MM-dd HH:mm',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
    });

    it('When full should build MatDateFormats correctly', () => {
        const factory = buildNgxMatDateFormatsFactory('full');

        const standardExpected: MatDateFormats = {
            parse: {
                dateInput: 'dd.MM.yyyy, HH:mm:ss'
            },
            display: {
                dateInput: 'dd.MM.yyyy, HH:mm:ss',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        };

        isEqualsTo(factory, localeFrCh, {
            parse: {
                dateInput: 'dd.MM.yyyy HH:mm:ss'
            },
            display: {
                dateInput: 'dd.MM.yyyy HH:mm:ss',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
        isEqualsTo(factory, localeItCh, standardExpected);
        isEqualsTo(factory, localeDeCh, standardExpected);
        isEqualsTo(factory, localeEnUs, {
            parse: {
                dateInput: 'MM/dd/yyyy, HH:mm:ss'
            },
            display: {
                dateInput: 'MM/dd/yyyy, HH:mm:ss',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
        isEqualsTo(factory, localeEs, {
            parse: {
                dateInput: 'dd/MM/yyyy, HH:mm:ss'
            },
            display: {
                dateInput: 'dd/MM/yyyy, HH:mm:ss',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: 'MMMM de yyyy'
            }
        });
        isEqualsTo(factory, localePl, standardExpected);
        isEqualsTo(factory, localeSv, {
            parse: {
                dateInput: 'yyyy-MM-dd HH:mm:ss'
            },
            display: {
                dateInput: 'yyyy-MM-dd HH:mm:ss',
                monthYearLabel: standardMonthYearLabel,
                dateA11yLabel: standardDateA11yLabel,
                monthYearA11yLabel: standardMonthYearA11yLabel
            }
        });
    });
});
