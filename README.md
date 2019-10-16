# Cordova In-App Purchase Tutorial

> A Series on How to Implement In-App Purchase in a Cordova Application.

Playlist: https://www.youtube.com/playlist?list=PLpQxqwBF5CvYoix346i9CZofVso4J-mwQ

We're using the plugin called
[cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase).
This is the most popular and cross platform option, with support for iOS,
Android, macOS, Windows and UWP.


## Introduction

In this episode, we will setup the basic architecture for the application we will be building.

 * [video](https://youtu.be/iEpKjnTopMA)
 * [sourcecode](https://github.com/j3k0/cordova-iap-workshop/tree/master/00-intro)


## Store Screen

In this episode, we will setup the store screen. This screen displays the list
of products the user can purchase. Information about the products are retrieved
from the AppStore.

 * [video](https://youtu.be/w92Uyz7R8Zw)
 * [sourcecode](https://github.com/j3k0/cordova-iap-workshop/tree/master/01-store)


## Make a Purchase

In this episode, we will see how to make a purchase: initiate it from with the
store.order() method, finalize the transaction and check the ownership status
of the product.

 * [video](https://youtu.be/58okUVHUZEw)
 * [sourcecode](https://github.com/j3k0/cordova-iap-workshop/tree/master/02-order)

## Subscription Status

In this episode, we fetch and display the information about the user's active
subscription in the Account screen. To do so, we activate receipt validation
using Fovea's service: https://billing.fovea.cc

 * [video](https://youtu.be/PdWt2-GsO-o)
 * [sourcecode](https://github.com/j3k0/cordova-iap-workshop/tree/master/03-account)

