# postcss-ri-columns
PostCSS plugin to create responsive immutable column classes wow that's a lot of buzzwords without breathing. If the idea of this seems a bit daft then [this article](http://csswizardry.com/2013/02/responsive-grid-systems-a-solution/) will hopefully make it seem more sensible.

## Install
`npm install postcss-ri-columns --save-dev`

## Usage

### gulpfile.js
```js
var postcss = require('postcss'),
    riCols = require('postcss-ri-columns');

gulp.task('styles', function(){
    var processors = [
        riCols({
            separator: '\\/',
            columns: 12,
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

### input.css
If a value isn't passed to `ri-columns` it will fall back to the default value of `12`. This can also be overridden in the default columns option in the gulpfile.

```css
.width- {
    width: ri-columns(12);
}
.offset- {
    margin-left: ri-columns(12);
}
```

### output.css
```css
.width-1/12 { width: 8.33334% }
...
.width-12/12 { width: 100% }

.offset-1/12 { margin-left: 8.33334% }
...
.offset-12/12 { margin-left: 100% }

@media (min-width: 30em) {
    .width-sm-1/12 { width: 8.33334% }
    ...
    .width-sm-12/12 { width: 100% }

    .offset-sm-1/12 { margin-left: 8.33334% }
    ...
    .offset-sm-12/12 { margin-left: 100% }
}

@media (min-width: 45em) {
    .width-md-1/12 { width: 8.33334% }
    ...
    .width-md-12/12 { width: 100% }

    .offset-md-1/12 { margin-left: 8.33334% }
    ...
    .offset-md-12/12 { margin-left: 100% }
}

@media (min-width: 60em) {
    .width-lg-1/12 { width: 8.33334% }
    ...
    .width-lg-12/12 { width: 100% }

    .offset-lg-1/12 { margin-left: 8.33334% }
    ...
    .offset-lg-12/12 { margin-left: 100% }
}
```

### page.html (_extreme example_)
```html
<div class="width-12/12 width-sm-8/12 width-md-6/12 width-lg-4/12  
offset-sm-1/12 offset-md-2/12 offset-lg-4/12">
    ...
</div>
```

## Options

### separator (String)
default: `\\/`

Separator between the column declaration (e.g. `'\\/' => .width-sm-1/12` or `'-of-' => .pull-lg-3-of-12`)

### breakpoints (Object)
Object that defines the breakpoints used. If this is omitted ri-columns will only generate the first lot of columns without a media query.

#### Example
```js
breakpoints: {
    'sm': '30em',
    'md': '45em',
    'lg': '60em',
}
```

### columns (Number)
default: `12`

The amount of columns in your grid. ri-columns works out the percentage units based on this. The `columns` default is overridden if an option is passed in the stylesheet.


## Changelog
### 0.2.0
* Allow column values to be passed in the css file (e.g `ri-columns(16)`)
* Default value can still be set in options

### 0.1.0
* Start from scratch. Rename and do this thing properly..ish.
