const moment = require('moment');
module.exports = {
  truncate: function(str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + ' ';
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(' '));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  tags: function(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate: function(date, format) {
    return (
      moment(date)
        //.locale('ru')
        .format(format)
    );
  },
  select: function(selected, options) {
    return options
      .fn(this)
      .replace(new RegExp(' value="' + selected + '"'), '$&selected="selected"')
      .replace(
        new RegExp('>' + selected + '</option>'),
        'selected="selected"$&'
      );
  },
  editIcon: function(storyUser, logUser, storyId, floating = true) {
    if (storyUser == logUser) {
      if (floating) {
        return `<a href='/stories/edit/${storyId}' class='btn-floating btn-large waves-effect waves-light  red lighten-3'><i class="fas fa-pencil-alt"></i></a>`;
      } else {
        return `<a href='/stories/edit/${storyId}'><i class="fas fa-pencil-alt"></i></a>`;
      }
    } else {
      return '';
    }
  }
};
