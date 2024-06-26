//gets video id from youtube links or returns null if cant parse
export function getYoutubeVideoID (url)
{
    //supported link matches
    //http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
    //http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
    //http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
    //http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
    //http://www.youtube.com/embed/0zM3nApSvMg?rel=0
    //http://www.youtube.com/watch?v=0zM3nApSvMg
    //http://youtu.be/0zM3nApSvMg
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length == 11) ? match[7] : null
}

//check if valid youtube link
export function isValidYoutubeUrl (url)
{
    //larger regex match on valid youtube videos . . . need to swap to this later for getting ID
    const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const match = url.match(regExp)
    return !!match
}