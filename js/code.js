
//add btn that appends new rows to tbody
function Addrow() {
  var number = ($('tbody tr').length)+1;
  var tr = '          <tr>'+
              '<td class="num">'+number+'</td>'+
              '<td><input type="text" placeholder="Student name" class="form-control name"></td>'+
              '<td><input type="number" placeholder="Score" class="form-control score"></td>'+
              '<td><input type="number" placeholder="Forgiveness" class="form-control forgiveness" value="0"></td>'+
              '<td class="final">0</td>'+
              '<td class="status alert undefine"></td>'+
              '<td><input type="button" class="btn btn-info btn-sm remove" value="Remove"></td>'+
            '</tr>';
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
  if(!isNaN(total) && total != '' && !isNaN(average) && average != '') $('.total').html('Total :' + total + '<br>' + 'Average : ' + average );
}

function status() {
  var status = this_row.parent().parent().find('.status');
  var max = $('#max').val();
  min = $('#min').val();
  if(final<=max)
  {
    total_average();
    switch(true)
    {

      case (final>=min) : status.html('Passed').removeClass('undefine').addClass('alert-success'); break;
      case (final<min) : status.html('Failed').removeClass('undefine').addClass('alert-danger'); break;
    }
  }

  if(final>max)
  {
    this_row.parent().parent().find('.final').html('More than '+ max +' ?').addClass('alert alert-danger');
  }
}

function refresh () {
  var status = this_row.parent().parent().find('.status');
  status.removeClass('alert-success').removeClass('alert-danger').html('').addClass('undefine');
  this_row.parent().parent().find('.final').removeClass('alert alert-danger');
  $('.total').html('Total :' + '');
}

function results() {
  $('#result_screen').removeClass('alert-danger').addClass('alert-success');;//refresh for new value!!
  results ='';
  $('.popup_header').html('اطلاعات کلی نمرات');
  var all_rows = $('tbody tr').length;
  var passed = $('tbody .alert-success').length;
  var failed = $('tbody .alert-danger').length;
  var undefine = $('tbody .undefine').length;
  var all = $('tbody tr');
  if(all_rows==0)
  {
    results = 'Since you have not provided infos for all of students , they removed completely! Start adding again';
  }
  if(all_rows!=0 && undefine == 0)
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
    results = 'لطفا اطلاعات '+ undefine + ' دانش آموز باقی مانده را وارد نمایید یا آن ها را حذف نمایید' + '<br'+
    '<input type="button" class="btn btn-success btn-sm" id="remove_undefine" style="float:left; margin-top:5px;">حذف آن ها</input>';
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

function alphabet_order(){

  var name = $('.name');
  var score = $('.score');
  var name_vals = [];
  var score_vals = [];
  for(i=0 ; i < name.length ; i++)
  {
    name_vals.push($(name[i]).val());
    score_vals.push($(score[i]).val());
  }
  name_vals.sort();
for(i=0; i < name.length ; i++)
{
  $(name[i]).val(name_vals[i]);
  $(score[i]).val(score_vals[i]);
}
}

$(document).ready(function(){
  $('#Add').on('click',Addrow);
  $('tbody').on('click','.remove',remove);
  $('#removeAll').on('click',removeAll);
  $('body').on('change keyup','.score,.forgiveness',Calc);
  $('body').on('focus','.forgiveness',function(){$(this).val('');});
  $('#results').on('click',results);
  $('body').on('click','.popup_background,#exit,#close-start',function(){$('.popup_background,.popup_box').fadeOut(500);});
  $('body').on('change keyup','#max,#min',function(){var first_row = $('tbody tr'); $(first_row[0]).find('.score').change();});
  $('body').on('click','#remove_undefine',remove_undefine);
  $('body').on('click','#alphabet',alphabet_order);
  //$('#container,.describtion,#header_name,.main,.setting').show();

});

$(document).ready(function(){ // startup animation
  $('#container').delay("fast").toggle(1000,function(){
    $('.describtion').delay("fast").toggle(1000,function(){
      $('#header_name').delay(1500).animate({'font-size':'200%' },500);
      $('#header_credit').delay(1500).animate({'font-size':'120%' },500,function(){
        $('.main').delay(500).toggle(1000,function(){
          $('.setting').delay(100).toggle(1000,function(){
            $('.popup_background,.popup_box').delay(500).fadeIn(500);
          });
          $('.popup_header').html('Welcome!');
          $('#result_screen').html('برای شروع بکار نمرات  را در قسمت مشخص شده وارد نمایید. برای مشاهده  اطلاعت کلی نمرات دکمه ی اطلاعات را بفشارید'+
          '<br>' + '<input type="button" class="btn btn-primary" id="close-start" value="Start" style="float:left;">' )
        });
      });
    });
  });
});
