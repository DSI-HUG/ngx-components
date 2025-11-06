@hug/message-box-dialog
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
            "input": "node_modules/@hug/ngx-message-box-dialog/translations",
            "glob": "**/*",
            "output": "translations/ngx-message-box-dialog"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxMessageBoxDialog('my/custom/output/path')`.

Then you have to provide `provideNgxMessageBoxDialog()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxMessageBoxDialogIntl, provideNgxMessageBoxDialog } from '@hug/ngx-message-box-dialog';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxMessageBoxDialog()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxMessageBoxDialogIntl extends NgxMessageBoxDialogIntl {
    public override errorDetails = '***My custom errorDetails***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: NgxMessageBoxDialogIntl,
            useClass: CustomNgxMessageBoxDialogIntl
        },
        provideNgxMessageBoxDialog()
    ]
};
```

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
