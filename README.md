mumble-widget.js
=============

This is a widget I wrote to display users and channels on a Mumble server I used to administrate.

Introduction
------------

A small Javascript solution that displays the details of a Mumble server that supports the [channel viewer protocol](http://mumble.sourceforge.net/Channel_Viewer_Protocol).

Developed primarily for three reasons:

* *Limit intrusiveness* - doesn't display potentially sensitive information such as administration privileges, idle time and Operating System.
* *Dynamic resizing* - other solutions are often within an iframe of pre-determined size. This means potentially unwanted space or a scrollbar.
* *Full customisability* - the stylesheet can be freely modified.

This version has benefits over [the previous PHP solution](https://github.com/ceva24/mumble-widget) in that it dynamically updates users/icons based on their status.

Install
-------

1. Set the value of `url` in the ajax call to the url of your server's exposed JSONP feed.

Example
------------
![mumble widget](https://www.ceva24.dev/public/images/mumble-widget.png "mumble-widget example screenshot")

