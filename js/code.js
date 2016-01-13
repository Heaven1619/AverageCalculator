$(document).ready(function(){
  $('#Add').on('click',Addrow);
  $('tbody').on('click','.remove',remove);
  $('#removeAll').on('click',removeAll);
  $('body').on('change keyup','.score,.forgiveness',Calc);
  $('body').on('focus','.forgiveness',function(){$(this).val('');});
  $('#results').on('click',results);
  $('.popup_background,#exit').on('click',function(){$('.popup_background,.popup_box').fadeOut(500);});
  $('body').on('change keyup','#max,#min',function(){$('.score').change();});
  $('body').on('click','#remove_undefine',remove_undefine);
});
$(document).ready(function(){ // startup animation
  $('#container').delay("fast").toggle(1000,function(){
    $('.describtion').delay("fast").toggle(1000,function(){
      $('.setting').delay("fast").toggle(1000,function(){
        $('.main').delay("fast").toggle(1000);
      });
    });
  });
});
//add btn that appends new rows to tbody
function Addrow() {
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td class="num">'+number+'</td>'+
              '<td><input type="text" placeholder="Student Name" class="form-control name"></td>'+
              '<td><input type="number" placeholder="Score" class="form-control score"></td>'+
              '<td><input type="number" placeholder="Forgiveness" class="form-control forgiveness" value="0"></td>'+
              '<td class="final">0</td>'+
              '<td class="status alert undefine"></td>'+
              '<td><input type="button" class="btn btn-info btn-sm remove" value="Remove"></td>'+
            '</tr>'
  $('tbody').append(tr);
}
//remove btn that remove the row which  is in it
function remove()
{
  $(this).parent().parent().remove();
  refresh_number();
  total_average();
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
  final = score + forgiveness;
  this_row.parent().parent().find('.final').html(final);
  total_average();
  status();
}

function total_average() {
  var scoreAll = $('.final');
  var total = 0;
  var num = 0;
//  scoreAll.each(function(i,e){ //although each func is faster than loop but for practicing i'll use a loop instead
//    var num = parseInt($(this).html(),10);
//    total += num;
//  });
  for(i=0;i<scoreAll.length;i++)
  {
    var num = parseInt($(scoreAll[i]).text(),10);
    total += num;
    var total_state = $('.total').html();
  }
  average  = total / $('tbody tr').length;
  if(!isNaN(total) && total != '' && !isNaN(average) && average != '') $('.total').html('Total : ' + total + '<br>' + 'Average : ' + average );
}

function status() {
  var status = this_row.parent().parent().find('.status');
  var max = $('#max').val();
  var min = $('#min').val();
  if(final<=max)
  {
    switch(true)
    {

      case (final>=min) : status.html('passed').removeClass('undefine').addClass('alert-success'); break;
      case (final<min) : status.html('failed').removeClass('undefine').addClass('alert-danger'); break;
    }
  }

  if(final>max)
  {
    this_row.parent().parent().find('.final').html('more than '+ max +' ?').addClass('alert alert-danger');
  }
}

function refresh () {
  var status = this_row.parent().parent().find('.status');
  status.removeClass('alert-success').removeClass('alert-danger').html('').addClass('undefine');
  this_row.parent().parent().find('.final').removeClass('alert alert-danger');
  $('.total').html('Total : ' + '');
}

function results() {
  $('#result_screen').removeClass('alert-danger').addClass('alert-success');//refresh for new value!!

  results ='';
  var all_rows = $('tbody tr').length;
  var passed = $('tbody .alert-success').length;
  var failed = $('tbody .alert-danger').length;
  var undefine = $('tbody .undefine').length;
  var all = $('tbody tr');
  if(undefine == 0)
  {
    switch(true)
    {
      case (passed==0) : results = 'Average of these ' + all_rows +' scores is ' + average+ ' and All ' + failed +' students unfortunately have failed.'; break;
      case (failed==0) : results = 'Average of these ' + all_rows +' scores is ' + average+ ' and All ' + passed + ' student have passed the exem. hooooora';  break;
      case (passed!=0 && failed!=0) : results = 'Average of these ' + all_rows +' scores is ' + average + ' and ' + passed + ' students have passed and ' + failed + ' students unfortunately have failed.';break;
    }
  }
  if(undefine !=0)
  {
    results = 'Please enter remaining '+ undefine + ' students info or remove them. thanks!' + '<br'+
    '<input type="button" class="btn btn-success btn-sm" id="remove_undefine" style="float:right;">Remove them </input>';
    $('#result_screen').removeClass('alert-success').addClass('alert-danger');

  }
  $('.popup_background,.popup_box').fadeIn(500);
  $('#result_screen').html(results);

}

function refresh_number() {
  var trs = $('tbody tr');
  var trs_len =  $('tbody tr').length;
  for(i=0;i<=trs_len;i++)
  {
    $($(trs[i])).find('.num').html(i+1);
  }
}
function remove_undefine() {
  $('tbody .undefine').parent().remove();
  refresh_number();
  Calc();
  $('#results').click();
}
