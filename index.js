'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-ri-columns', function (opts) {
    opts = opts || {};
    opts.breakpoints = opts.breakpoints || null;
    opts.columns = opts.columns || 12;
    opts.separator = opts.separator ||  '\\/';

    return function(css) {
        try {
            css.walkDecls(function (decl) {
                if (decl.value.indexOf('ri-columns') !== -1) {

                    // One non-mq specific set of rules
                    for (var i = 0; i < opts.columns; i++) {
                        var sel = decl.parent.selector + (i+1) + opts.separator + opts.columns,
                            val = ((i+1) / opts.columns * 100).toFixed(5) + '%';

                        var rule = postcss.rule({
                                selector: sel
                            }).append({
                                prop: decl.prop,
                                value: val
                            });

                        // Add to compiled CSS
                        css.append(rule);
                    }


                    // Loop through specified breapoints if they exist
                    if (opts.breakpoints || typeof opts.breakpoints !== 'Object') {
                        for (var bpKey in opts.breakpoints) {

                            // Set up the relevant media query
                            var mq = postcss.atRule({
                                name: 'media',
                                params: '(min-width:'+ opts.breakpoints[bpKey] +')'
                            });

                            for (var i = 0; i < opts.columns; i++) {
                                var sel = decl.parent.selector + bpKey + '-' + (i+1) + opts.separator + opts.columns,
                                    val = ((i+1) / opts.columns * 100).toFixed(5) + '%';

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
        } catch (e) {
            console.error(e);
        }
    }
});
