@hug/search-container
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
            "input": "node_modules/@hug/ngx-search-container/src/assets/translations",
            "glob": "**/*",
            "output": "assets/translations/ngx-search-container"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxSearchContainer('my/custom/output/path')`.

Then you have to provide `provideNgxSearchContainer()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxSearchContainerIntl, provideNgxSearchContainer } from '@hug/ngx-search-container';

export const appConfig: ApplicationConfig = {
    providers: [
        NgxSearchContainerIntl,
        provideNgxSearchContainer()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxSearchContainerIntl extends NgxSearchContainerIntl {
    public override errorDetails = '***My custom errorDetails***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: NgxSearchContainerIntl,
            useClass: CustomNgxSearchContainerIntl
        },
        provideNgxSearchContainer()
    ]
};
```

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
