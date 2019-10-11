$(document).ready(function() { 

var btn = $('#btn');
btn.on('click', function(e){
	$.ajax({
		type:'POST',
		url:'getdata.php',
		dataType: "json",
		data:{},
		success:function(data){
			var str = '';
			
			for(var i = 0; i < data.length; ++i)
			{
				if(str.length > 0)
				{
					str += '<br>'
				}
				str += data[i].v1;
			}
			
			$('#php-data').text(str);
		}
	});
});

});