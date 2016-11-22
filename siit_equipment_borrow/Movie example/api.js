let rootURL = 'http://www.omdbapi.com/';

exports.search = function(q){
  let url = `${rootURL}?s=${q}`;
  return fetch(url)
    .then((resp)=>resp.json())
    .then((json)=>{
    if(typeof json.Error=='undefined')
    {
      return json.Search;
    }
      return "error";
    });
}

exports.view = function(id){
  let url = `${rootURL}?i=${id}&plot=short&r=json`;
  return fetch(url)
    .then((resp)=>resp.json());
}
