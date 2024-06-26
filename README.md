## Learnwell Educational Video Sharing Repository
online educational video sharing/interaction platform . . . submission for Codelabs code assesment.
Loom video available [here](https://www.loom.com/share/e59583343fbe4bfa9265180e0dba4005?sid=21f1b4ba-1d43-4230-9c38-3705f2744d74)

## How to Run
copy code repository and go inside root folder
```bash
# install necessary components
npm install

#run dev server
npx next dev

#create production build
npx next build

#start prod build
npx next start
```
navigate to ```localhost:3000``` to see the app

##General Overview
Learnwell is setup like a video repository much like how youtube works but dedicated to educational content. There is a home page which lists videos and a page to view videos and comment
![home page](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/home.png)
![video page](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/video_player_with_comments.png)
User authentication is facilitated using a simple sqlite database to be able to protect others from people posting under their account. users cannot upload videos or comment without first signing in
![login modal](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/login.png)
![register modal](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/register.png)
adding videos is done by using youtube links. This was in my opinion the best way as youtube provides an embedded player with controls and it is easy to grab images for the main photo. As such, all links must be a valid one or it will not allow it to be posted
![youtube link validation](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/youtube_link_validation.png)
application can be accessed on mobile devices as learning on the go is always a welcome experience
![mobile layout](https://raw.githubusercontent.com/anatoli-dp/codelabs_learnwell/main/pics/r_mobile.png)

## Tools
- NextJS
- Mantine UI
- SQlite3

## Future Considerations
Given more time I would have refactored some of the internals to have a better layout so there isnt so much state passing for things like video searches.
I would also like to have expanded on the database to allow for custom usernames as well as log video ids so that the application can be more self contained instead of feeding from other submissions as well as included a more robust authentication server to allow for proper user creation and retrival.
While the application can be viewed on small devices such as phones and tablets it is far from a perfect solution and much work can be done improving the responsiveness and give it a better feel. Though responsiveness can also be extended into the full application with additions such as being able to lazily load the videos in.
Validation and testing was done by hand in the application and creating a set of testing tools would further enhance the ability for not only myself but others to be able to add more to the application and make it easier to grow.
I did not use typescript for this project as it was a quick demonstration, however to future-proof it and allow more people to have an easier time accessing and modifying the application converting the project over would be a great idea.
