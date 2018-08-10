# stremio-aggregators

This module aggregates catalogs and streams from all stremio add-ons passed to it

Currrently it contains a few components

* Catalogs aggregator
* Streams aggregator
* Generic aggregator (all the above are using it)

Usage:

```javascript
const addons = [] // this should be an array of instances of AddonClient, for example AddonCollection.addons
const aggr = new Catalogs(addons)

// aggr.results will be populated with entries of { addon, resource, type, id, extra, isReady, response, error }

// .run() will request every object in aggr.results that are not isReady == true
aggr.run()

aggr.evs.on('updated', function() {
	// do something with aggr.results
})
aggr.evs.on('finished', function() {
	// do something with aggr.results
})

// Also, for convenience, there is aggr.onFinished, which is a promise which is resolved when the results are finished
// you can use aggr.onFinished.then() rather than chechking `aggr.isFinished()` and binding to the finished event if it's not
```


### `getCached(AggrConstructor)`

Will return a function that takes the same args as `AggrConstructor`, but returns a cached instance if the args are the same

Please keep in mind that this might return an `aggr` that has already finished all the results, so it won't emit `finished` event. For convenience, it is recommended that you use the `aggr.onFinished` promise in those cases