@hug/layout
=======

#### > Breaking changes

`closeButtonLabel` and `backButtonLabel` inputs are removed.
You can override the translation provided by creating a custom provider for `NgxLayoutIntl` as show below or in demo-app.

#### > Configuration for internationalization

This library supports internationalization.

First of all you have to import the asset translation files like:

```
{
    ...
    "assets": [
        ...
        {
            "input": "node_modules/@hug/ngx-layout/translations",
            "glob": "**/*",
            "output": "translations/ngx-layout"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxLayout({ translationsPath: 'my/custom/output/path' })`.

Then you have to provide `provideNgxLayout()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxLayoutIntl, provideNgxLayout } from '@hug/ngx-layout';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxLayout()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxLayoutIntl extends NgxLayoutIntl {
    public override closeLabel = '***My custom closeLabel***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideNgxLayout({ customIntl: CustomNgxLayoutIntl })
    ]
};
```

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
