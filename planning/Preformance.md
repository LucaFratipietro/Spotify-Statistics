# Performance of Spotify Favourites

## Introduction and Methodology

<!-- Briefly state how you gathered data about app performance, and in what environment 
(which browsers, what browser versions, what kind of device, OS,
width and height of viewport as reported in the console with `window.screen) -->

<!-- Also report overall impact on whatdoesmysitecost results before and after all your changes -->

## Areas to Improve

## Summary of Changes 

### Change 1 -- Fetch less feilds per songs

Lead: Luca

Currently, the original fetch allSongs endpoint was returning all the data from the songs,
even though we only used a select number of fields (Genre, songname, artist etc.)

This could be causing the Largest Contentful Paint (LCP) of the intial page load to be longer
since we fetch extra data in the initial useEffect

![LCP](./images/LCP.PNG)



### <!-- Change n -->

Lead: <!-- name main contributor to this change -->

## Conclusion

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main 
things you learned from this experience. -->