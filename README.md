# stremio-aggregators

This module aggregates catalogs and streams from all stremio add-ons passed to it

Currrently it contains a few components

* Catalogs aggregator
* Streams aggregator
* Generic aggregator (all the above are using it)

Usage:

```
const addons = [] // this should be an array of instances of AddonClient, for example AddonCollection.addons
const aggr = new Catalogs(addons)

aggr.evs.on('updated', function() {
	// do something with aggr.results
})
aggr.evs.on('finished', function() {
	// do something with aggr.results
})
```

