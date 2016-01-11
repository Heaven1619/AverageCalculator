$(document).ready(function(){
  $('#Add').on('click',Addrow);

});

function Addrow(){
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td>'+number+'</td>'+
              '<td><input type="text" placeholder="Student Name" class="form-control name"></td>'+
              '<td><input type="number" placeholder="Score" class="form-control score"></td>'+
              '<td><input type="number" placeholder="Forgiveness" class="form-control score"></td>'+
              '<td><span class="final"></span></td>'+
              '<td><span class="status"></span></td>'+
              '<td><input type="button" class="btn btn-primary btn-sm remove" value="Remove"></td>'+
            '</tr>'
  $('tbody').append(tr);
}
