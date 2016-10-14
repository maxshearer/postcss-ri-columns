'use strict';

var postcss = require('postcss'),
    valueParser = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-ri-columns', function (opts) {
    opts = opts || {};
    opts.breakpoints = opts.breakpoints || null;
    opts.columns = opts.columns || 12;
    opts.separator = opts.separator ||  '\\/';

    return function(css) {
        css.walkDecls(function (decl) {
            if (decl.value.indexOf('ri-columns') !== -1) {

                // Check to see if a number of columns has been passed
                // otherwise fallback to the default
                var riCols = valueParser(decl.value),
                    columns = opts.columns;

                riCols.walk(function(node) {
                    if (!isNaN(parseInt(node.value))) {
                        columns = parseInt(node.value);
                    }
                });

                // One non-mq specific set of rules
                for (var i = 0; i < columns; i++) {
                    var sel = decl.parent.selector + (i+1) + opts.separator + columns,
                        val = ((i+1) / columns * 100).toFixed(5) + '%';

                    var rule = postcss.rule({
                            selector: sel
                        }).append({
                            prop: decl.prop,
                            value: val
                        });

                    // Add to compiled CSS
                    css.append(rule);
                }

                // Loop through specified breakpoints if they exist
                if (opts.breakpoints || typeof opts.breakpoints !== 'Object') {
                    for (var bpKey in opts.breakpoints) {

                        // Set up the relevant media query
                        var mq = postcss.atRule({
                            name: 'media',
                            params: '(min-width:'+ opts.breakpoints[bpKey] +')'
                        });

                        // First do a zeroed version so you can cancel out offsets
                        var sel = decl.parent.selector + bpKey + '-0' + opts.separator + columns,
                            val = '0';

                        var rule = postcss.rule({
                                selector: sel
                            }).append({
                                prop: decl.prop,
                                value: val
                            });

                        mq.append(rule);

                        for (var i = 0; i < columns; i++) {
                            var sel = decl.parent.selector + bpKey + '-' + (i+1) + opts.separator + columns,
                                val = ((i+1) / columns * 100).toFixed(5) + '%';

                            var rule = postcss.rule({
                                    selector: sel
                                }).append({
                                    prop: decl.prop,
                                    value: val
                                });

                            // Append rule into media query
                            mq.append(rule);
                        }

                        // Add to compiled CSS
                        css.append(mq);
                    }
                }

                // Get rid of initial declaration as it's not needed anymore
                decl.parent.remove();
			}
        });
    }
});
