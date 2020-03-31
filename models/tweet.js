"use strict";

class Tweet {
    screen_name;
    id_str;
    created_at;
    followers_count;
    friends_count;
    verified;
    status_count;
  constructor(screen_name, 
    id_str, 
    created_at,
    followers_count,
    friends_count,
    verified,
    status_count ) {
      this.screen_name = screen_name;
      this.id_str = id_str;  
      this.created_at = created_at;
      this.followers_count = followers_count;
      this.friends_countt = friends_count;
      this.verified = verified;
      this.status_count = status_count
  }
}
module.exports = Tweet;