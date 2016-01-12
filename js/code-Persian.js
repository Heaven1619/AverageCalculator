$(document).ready(function(){
  $('#Add').on('click',Addrow);
  $('tbody').on('click','.remove',remove);
  $('#removeAll').on('click',removeAll);
  $('body').on('change keyup','.score,.forgiveness',Calc);
  $('body').on('focus','.forgiveness',function(){$(this).val('');});
  $('#results').on('click',results);
  $('.popup_background,#exit').on('click',function(){$('.popup_background,.popup_box').fadeOut(500);});
  $('#min,#max').on('change keyup',function(){$('.score').change();});
});
//add btn that appends new rows to tbody
function Addrow() {
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td class="num">'+number+'</td>'+
              '<td><input type="text" placeholder="نام دانش آموز" class="form-control name"></td>'+
              '<td><input type="number" placeholder="نمره" class="form-control score"></td>'+
              '<td><input type="number" placeholder="ارفاق" class="form-control forgiveness" value="0"></td>'+
              '<td class="final"></td>'+
              '<td class="status alert undefine"></td>'+
              '<td><input type="button" class="btn btn-info btn-sm remove" value="حذف این نفر"></td>'+
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
  average  = (total / $('tbody tr').length).toFixed('2');
  if(!isNaN(total) && total != '' && !isNaN(average) && average != '') $('.total').html('مجموع : ' + total + '<br>' + 'میانگین :‌ ' + average );
}

function status() {
  var status = this_row.parent().parent().find('.status');
  var max = $('#max').val();
  min = $('#min').val();
  if(final<=max)
  {
    switch(true)
    {

      case (final>=min) : status.html('قبول').removeClass('undefine').addClass('alert-success'); break;
      case (final<min) : status.html('تجدید').removeClass('undefine').addClass('alert-danger'); break;
    }
  }

  if(final>max)
  {
    this_row.parent().parent().find('.final').html('بیشتر از '+ max +' ؟').addClass('alert alert-danger');
  }
}

function refresh () {
  var status = this_row.parent().parent().find('.status');
  status.removeClass('alert-success').removeClass('alert-danger').html('').addClass('undefine');
  this_row.parent().parent().find('.final').removeClass('alert alert-danger');
  $('.total').html('مجموع : ' + '');
}

function results() {
  $('#result_screen').removeClass('alert-danger');//refresh for new value!!
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
      case (passed==0) : results = 'میانگین نمرات این ' + all_rows + ' دانش آموز' + average + ' میباشد و همه آن ها نتوانسته نبره قبولی  (' + min +')' +' را به دست آورند و متاسفانه تجدید شده اند'; break;
      case (failed==0) : results = 'میانگین نمرات این ' + all_rows + ' دانش آموز' + average + ' میباشد و همه ی آن ها  نمره قبولی (' + min +')'+ ' را کسب کرده و قبول شده اند';  break;
      case (passed!=0 && failed!=0) : results = 'میانگین نمرات این ' + all_rows +' دانش آموز' + average + ' میباشد و ' + passed + ' نفر قبول و ' + failed + ' نفر متاسفانه تجدید شده اند.';break;
    }
  }
  if(undefine !=0)
  {
    results = 'لطفا اطلاعات '+ undefine + ' دانش آموز باقی مانده را وارد نمایید یا آن ها را حذف نمایید';
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
