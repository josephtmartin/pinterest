import userData from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';

const boardForm = () => {
  $('#board-form').html(`
  <h2>Add A Board</h2>
  <div id="success-message"></div>
  <form>
    <div id="error-message"></div>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Example: Woodworking">
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input type="text" class="form-control" id="image" placeholder="URL">
    </div>
    <div class="form-group">
      <label for="user">User</label>
        <select class="form-control" id="user">
          <option value="">Select a User</option>
        </select>
    </div>
    <button id="add-board-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Board</button>
  </form>
  `);

  userData.getAllUsers().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}">${item.name}</option>`);
    });
  });
  $('#add-board-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      name: $('#name').val() || false,
      image: $('#image').val() || false,
      useruid: $('#user').val() || false,
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html(
        '<div class="alert alert-danger" role="alert">Please complete all fields</div>'
      );
    } else {
      $('#error-message').html('');
      boardData
        .addBoard(data)
        .then(() => {
          $('#success-message').html(
            '<div class="alert alert-success" role="alert">Your Board Was Added!</div>'
          );
          setTimeout(() => {
            $('#success-message').html('');
          }, 3000);
        })
        .catch((error) => console.warn(error));
      $('#image').val('');
      $('#name').val('');
      $('#user').val('');
    }
  });
};

export default { boardForm };
