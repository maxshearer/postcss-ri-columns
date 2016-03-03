# postcss-ri-columns
PostCSS plugin to create responsive immutable column utility classes wow that's a lot of buzzwords without breathing. If the idea of this seems a bit daft then [this article](http://csswizardry.com/2013/02/responsive-grid-systems-a-solution/) will hopefully make it seem more sensible.

## Install
`npm install postcss-ri-columns --save-dev`

## Usage
gulpfile.js
```js
var postcss = require('postcss'),
    riCols = require('postcss-ri-columns');

gulp.task('styles', function(){
    var processors = [
        riCols({
            columns: 12,
            separator: '\\/',
            breakpoints: {
                'sm': '30em',
                'md': '45em',
                'lg': '60em',
            }
        })
    ];

    gulp.src('input.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('output.css';))
});
```

input.css
```css
.width- {
    width: ri-columns;
}
```

output.css
```css
.width-1/12 { width: 8.33334% }
.width-2/12 { width: 12.5% }
...
.width-12/12 { width: 100% }

@media (min-width: 30em) {
    .width-sm-1/12 { width: 8.33334% }
    .width-sm-2/12 { width: 12.5% }
    ...
    .width-sm-12/12 { width: 100% }
}

@media (min-width: 45em) {
    .width-md-1/12 { width: 8.33334% }
    .width-md-2/12 { width: 12.5% }
    ...
    .width-md-12/12 { width: 100% }
}

@media (min-width: 60em) {
    .width-lg-1/12 { width: 8.33334% }
    .width-lg-2/12 { width: 12.5% }
    ...
    .width-lg-12/12 { width: 100% }
}
```

page.html
```html
<div class="width-12/12 width-sm-8/12 width-md-6/12 width-lg-4/12">
    ...
</div>
```

## Options

### columns (Number)

default: `12`

The amount of columns in your grid. ri-columns works out the percentage units based on this.

### separator (String)

default: `\\/`

Separator between the column declaration (e.g. `'\\/' => .width-sm-1/12` or `'-of-' => .pull-lg-3-of-12`)

### breakpoints (Object)

default: `null`

Object that defines the breakpoints used. If omitted ri-columns will only generate the first lot of columns without a media query.

#### Example
```js
breakpoints: {
    'sm': '30em',
    'md': '45em',
    'lg': '60em',
}
```


## Changelog
* 0.1.0 Start from scratch. Rename and do this thing properly..ish.
