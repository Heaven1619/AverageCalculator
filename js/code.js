$(document).ready(function(){
  $('#Add').on('click',Addrow);
  $('tbody').on('click','.remove',remove);
  $('#removeAll').on('click',removeAll);
  $('body').on('change keyup','.score,.forgiveness',Calc);
});
//add btn that appends new rows to tbody
function Addrow() {
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td>'+number+'</td>'+
              '<td><input type="text" placeholder="Student Name" class="form-control name"></td>'+
              '<td><input type="number" placeholder="Score" class="form-control score"></td>'+
              '<td><input type="number" placeholder="Forgiveness" class="form-control forgiveness"></td>'+
              '<td class="final">0</td>'+
              '<td class="status"></td>'+
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
  this_row = $(this);
  refresh(); //this func will clear the status to their default state for new value change...
  var score = parseInt(this_row.parent().parent().find('.score').val(),10),
      forgiveness = parseInt(this_row.parent().parent().find('.forgiveness').val(),10);
  if(score && !forgiveness)
  {
    final = score;
  }
  if(!score && forgiveness)
  {
    final = 'Enter Score too!';
    this_row.parent().parent().find('.final').addClass('alert alert-danger');
  }
  if(score && forgiveness)
  {
    final = score + forgiveness;
  }
  if(!score && !forgiveness)
  {
    final = 0;
  }

  this_row.parent().parent().find('.final').html(final);

  status();
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

function status() {
  var status = this_row.parent().parent().find('.status');
  if(final<=20)
  {
    total();
    switch(true)
    {

      case (final>=10) : status.html('passed').addClass('alert-success'); break;
      case (final<10) : status.html('failed').addClass('alert-danger'); break;
    }
  }

  if(final>20)
  {
    alert('more than 20');
  }
}

function refresh () {
  var status = this_row.parent().parent().find('.status');
  status.removeClass('alert-success').removeClass('alert-danger');
  this_row.parent().parent().find('.final').removeClass('alert alert-danger');
}
