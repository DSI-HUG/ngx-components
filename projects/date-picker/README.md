@hug/date-picker
=======

#### > Configuration for internationalization

This library supports internationalization.

First of all you have to import the asset translation files like:

```
{
    ...
    "assets": [
        ...
        {
            "input": "node_modules/@hug/ngx-date-picker/m2/translations",
            "glob": "**/*",
            "output": "translations/ngx-date-picker"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxDatePicker({ translationsPath: 'my/custom/output/path' })`.

Then you have to provide `provideNgxDatePicker()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxDatePickerIntl, provideNgxDatePicker } from '@hug/ngx-date-picker';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxDatePicker()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxDatePickerIntl extends NgxDatePickerIntl {
    public override errorDetails = '***My custom errorDetails***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxDatePicker({ customIntl: CustomNgxDatePickerIntl })
    ]
};
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
