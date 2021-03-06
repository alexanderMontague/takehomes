# Shopify 2019 Internship Challenge
![](https://i.imgur.com/KbpB1qu.png)

### Description
- Challenge to replicate a waste lookup web app
- Searching for an item returns a list of disposal methods based on its keywords

### To Run
- Clone the repo `git clone https://github.com/alexanderMontague/takehomes`
- CD into the correct project `cd Shopify2019`
- install dependencies using preferred method `yarn` or `npm i`
- run the application (will automatically open in browser) `yarn start` or `npm start`
- OR visit the hosted version here: <https://alexandermontague.github.io/takehomes/Shopify2019/dist/>

### Limitations
- **_NOTE!_** I stored the JSON locally and realized I should have used the city of toronto API after submission :(. I hope this does not hinder my application, and if you want to see an API request example please see the Shopify 2017 challenge! I make a proxied request there
- The design seemed to also search using the disposal method name
- I decided against doing that as the spec strictly said use the keywords
- I used the generally frowned upon react prop `dangerouslySetInnerHTML`. This was only because the body data we were given already contained the HTML markup styling the descriptions

### Accidentally did the 2017 challenge too T_T
![](https://i.imgur.com/eraH7Xj.png)
- If you want to see that too, head on over to https://alexandermontague.github.io/takehomes/Shopify2017/dist/
- Spec: https://jawb.io/job/shopify-toronto-on-6-developer-intern-2/


### Spec
# Web Engineer Challenge - Summer 2019

Build a web app to search for waste items using the Toronto Waste Wizard database, and save frequently used ones.

## Instructions
- Reproduce the design as provided in the screenshot, which displays example search results.
- The data must be taken from the [Waste Wizard Lookup data (JSON)](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#5ed40494-a290-7807-d5da-09ab6a56fca2).
- Typing in the search field should *NOT* perform an API call.
- A search must be performed when hitting enter or clicking the search button.
- When the search input field is cleared, the list of results should also be cleared. 
- Performing a search should render a list of potential matching items based on keywords. Each item should:
   - Render the title and description of the item.
   - Render a grey star button *if the item is not already favourited*.
   - Render a green star icon *if the item is not already favourited*.
   - Clicking the star button should add the item to the favourites list.
- When the number of favourites is more than one, the app should render a list of items. Each saved item should:
   - Render the title and description of the item.
   - Render a green star button *if the item has been favourited*.
   - Clicking the green star button should remove the item from the saved list.

## Design

![Design](http://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png)

## Submission

In your application, please include: 

1. A link to your codebase, for review.
2. A link to a hosted version, for testing.
