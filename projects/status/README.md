@hug/ngx-status
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
            "input": "node_modules/@hug/ngx-status/translations",
            "glob": "**/*",
            "output": "translations/ngx-status"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxStatus({ translationsPath: 'my/custom/output/path' })`.

Then you have to provide `provideNgxStatus()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxStatusIntl, provideNgxStatus } from '@hug/ngx-status';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxStatus()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxStatusIntl extends NgxStatusIntl {
    public override errorDetails = '***My custom errorDetails***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxStatus({ customIntl: CustomNgxStatusIntl })
    ]
};
```

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
