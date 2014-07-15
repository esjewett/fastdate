fastdate
========

A fast JavaScript date parsing library


Naive benchmarks (run "gulp mocha" to run locally):

```
d3.js parsing: 276ms (0.00276 ms/parse)
d3.js formatting: 210ms(0.0021 ms/parse)
moment.js parsing: 2216ms(0.02216 ms/parse)
moment.js formatting: 155ms(0.00155 ms/parse)
fastdate.js parsing: 169ms(0.00169 ms/parse)
fastdate.js formatting: 26ms(0.00026 ms/parse)
Optimal parsing: 48ms(0.00048 ms/parse)
Optimal formatting: 16ms(0.00016 ms/parse)
```

Parsing in 60% of the time of d3.js, formatting in 13% of the time. There is quite a bit of headroom to hit the 'optimal' times, so there is work to do!
