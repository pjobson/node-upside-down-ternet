node-upside-down-ternet
=======================

Upside-Down-Ternet for node.js 

Requires: 
* [node-imagemagick](https://github.com/rsms/node-imagemagick)
* [http](http://nodejs.org/api/http.html)
* [url](http://nodejs.org/api/url.html)
* [path](http://nodejs.org/api/path.html)
* [fs](http://nodejs.org/api/fs.html)

Loosely based on the the original awesome [Upside-Down-Ternet](http://www.ex-parrot.com/~pete/upside-down-ternet.html).  I plan on running this directly on a [Buffalo WZR-HP-AG300H](http://www.buffalotech.com/products/wireless/dual-band-wireless-routers/airstation-highpower-n600-gigabit-dual-band-wireless-router-wzr-hp-ag300h) running [OpenWRT](http://wiki.openwrt.org/toh/buffalo/wzr-hp-ag300h).  Giorgio Cefaro cross-compiled node for the [Arduino Yún](http://giorgiocefaro.com/blog/installing-node-js-on-arduino-yun) which also works on the aformentioned router.

The test code upside-down-ternet.node.js runs on port 8888 at local host, it is only running on my Mac so far using v0.10.22.

I'll be testing the guest network using this guide on the OpenWRT wiki. [Configure a guest WLAN using the Luci web-interface](http://wiki.openwrt.org/doc/recipes/guest-wlan-webinterface).
