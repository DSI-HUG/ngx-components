@hug/user-card
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
            "input": "node_modules/@hug/ngx-user-card/src/assets/translations",
            "glob": "**/*",
            "output": "assets/translations/ngx-user-card"
        }
    ]
}
```

You can choose another output path, but you will need to override the default value in the `provideNgxUserCard('my/custom/output/path')`.

Then you have to provide `provideNgxUserCard()` ; you call provide it globally in your main `ApplicationConfig` like:

```typescript
import { NgxUserCardIntl, provideNgxUserCard } from '@hug/ngx-user-card';

export const appConfig: ApplicationConfig = {
    providers: [
        NgxUserCardIntl,
        provideNgxUserCard()
    ]
};
```

Note that you can also override specific translation entries by providing a custom class implementation like:

```typescript
@Injectable()
export class CustomNgxUserCardIntl extends NgxUserCardIntl {
    public override service = '***My custom service***';
}

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: NgxUserCardIntl,
            useClass: CustomNgxUserCardIntl
        },
        provideNgxUserCard()
    ]
};
```

The sources for this package are in the main [DSI-HUG/ngx-components](https://github.com/dsi-hug/ngx-components) repo. Please file issues and pull requests against that repo.

License: GPL-3.0-only
