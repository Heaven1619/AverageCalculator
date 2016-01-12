$(document).ready(function(){
  $('#Add').on('click',Addrow);
  $('.remove').on('click',remove);
  $('#removeAll').on('click',removeAll);
  $('.score,.forgiveness').on('change',Calc);
});
//add btn that appends new rows to tbody
function Addrow() {
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td>'+number+'</td>'+
              '<td><input type="text" placeholder="Student Name" class="form-control name"></td>'+
              '<td><input type="number" placeholder="Score" class="form-control score"></td>'+
              '<td><input type="number" placeholder="Forgiveness" class="form-control forgiveness"></td>'+
              '<td><span class="final">0</span></td>'+
              '<td><span class="status"></span></td>'+
              '<td><input type="button" class="btn btn-primary btn-sm remove" value="Remove"></td>'+
            '</tr>'
  $('tbody').append(tr);
}
//remove btn that remove the row which  is in it
function remove()
{
  $(this).parent().parent().remove();
}
//remove btn that will remove All rows
function removeAll()
{
  $('tbody tr').remove();
}
//this func will sum score and forgiveness in each row and then
function Calc()
{
  var score = parseInt($(this).parent().parent().find('.score').val(),10),
      forgiveness = parseInt($(this).parent().parent().find('.forgiveness').val(),10);

  var final = score + forgiveness;
  $(this).parent().parent().find('.final').html(final);

  total();
}

function total() {
  var scoreAll = $('.final');
  var total = 0;
  var num = 0;
//  scoreAll.each(function(i,e){ //although each func is faster than loop but for practicing i'll use a loop instead
//    var num = parseInt($(this).html(),10);
//    total += num;
//  });
  for(i=0;i<scoreAll.length;i++)
  {
    var num = parseInt($(scoreAll[i]).html(),10);
    total += num;
    $('.total').html('Total : ' + total);
  }

}
