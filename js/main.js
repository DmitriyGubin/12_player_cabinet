/**показать больше**/
Create_More_Items_System(3, 1, '#more-similar-box', '.play-video .similar-item', 'hide');

function Create_More_Items_System(number_initially_visible, delta_items, selector_button_parent, selector_item, hide_class)
{
	var all_elements = document.querySelectorAll(selector_item);
	var amount = all_elements.length;
	if(amount != 0)
	{
		if (amount  > number_initially_visible)
		{
			var j = 0;
			for (let item of all_elements)
			{
				j++;
				if(j > number_initially_visible)
				{
					item.classList.add(hide_class);
				}
			}

			var parent = document.querySelector(selector_button_parent);
			let button = document.createElement('button');
			button.id = 'more-similar';
			button.innerHTML = 'Показать еще';
			parent.appendChild(button);

			Click_Button_More_Items(delta_items, all_elements, button.id, 'hide');
		}
	}
}

function Click_Button_More_Items(num_records, elements_reff, id_button, hide_class)
{
	var button_id_selector = '#' + id_button;
	document.querySelector(button_id_selector).addEventListener("click", function(){
	    var num = 0;
	    for (let item of elements_reff)
	    {
	        if((item.classList.contains(hide_class)) && (num < num_records))
	        {
	            item.classList.remove(hide_class);
	            num++;
	        }
	    }
	    if (num == 0)
	    {
	        document.querySelector(button_id_selector).remove();
	    }
	});
}
/**показать больше**/


/*******чeрeдование классов кнопки svg избранное*****/
// Change_Button_Svg_Text(document.querySelector('#add-favorites'),
// 					   document.querySelector('#add-favorites svg'), 
// 					   'В избранное', 'В избранном', 'active');

function Change_Button_Svg_Text(button_reff, svg_reff, old_name, new_name, toggle_class)
{
	var button_text_reff = button_reff.querySelector('span');
	button_reff.addEventListener("click", function(){
		if(svg_reff.classList.contains(toggle_class))
		{
			button_text_reff.innerHTML = old_name;
		}
		else
		{
			button_text_reff.innerHTML = new_name;
		}
		svg_reff.classList.toggle(toggle_class);
	});
}

var svg_reff = document.querySelector('#add-favorites svg');
document.querySelector('#add-favorites').addEventListener('click', function(){
	svg_reff.classList.toggle('active');
});
/*******чeрeдование классов кнопки svg избранное*****/


/*************Полное, краткое описание*****************/
var text_button_ref = document.querySelector('.play-video .more-text');
var short_text_ref = document.querySelector('.play-video .about-video-text.short');
var full_text_ref = document.querySelector('.play-video .about-video-text.full');
Change_Button_Svg_Text(text_button_ref,
					   document.querySelector('.play-video .more-text svg'), 
					   'Полное описание', 'Скрыть', 'active-arrow');
text_button_ref.addEventListener('click', function(){
	short_text_ref.classList.toggle('hide');
	full_text_ref.classList.toggle('hide');
});
/*************Полное, краткое описание*****************/



/*********Отправка комментария*******************/
var desctop_button_send = document.querySelector('.play-video .line-arrow');
var mobile_button_send = document.querySelector('.play-video #send-comment');

First_Comments_Input_Init();

window.addEventListener('resize', function(){
	First_Comments_Input_Init();
});

function First_Comments_Input_Init()
{
	if(screen.width < 750)
	{
		Moble_Comments_Input();
	}
	else
	{
		Desctop_Comments_Input();
	}
}

function Moble_Comments_Input()
{
	desctop_button_send.classList.add('hide');
	Comment_Input_Rules('.play-video #send-comment', 'show');
}

function Desctop_Comments_Input()
{
	mobile_button_send.classList.add('hide');
	Comment_Input_Rules('.play-video .line-arrow', 'show_flex');
}

function Comment_Input_Rules(hide_button_selector, show_class_name)
{
	var coment_input = document.querySelector('.play-video #comment-video-input');
	var go_to_button = document.querySelector(hide_button_selector);
	coment_input.addEventListener('input', function(){
		go_to_button.classList.add(show_class_name);
		if(coment_input.value.length == 0)
		{
			go_to_button.classList.remove(show_class_name);
		}
	});
}
/*********Отправка комментария*******************/



/*******Скрываем, показываем на комментарии*********/
var text_arrow_reff = document.querySelector('.play-video .comments-show-hide');
var hide_show_box = document.querySelector('.hide-show-mobile-commentary-box');


Change_Button_Svg_Text(text_arrow_reff,
					   document.querySelector('.play-video .comments-show-hide svg'), 
					   'Скрыть', 'Показать', 'active');
text_arrow_reff.addEventListener('click', function(){
		$(hide_show_box).slideToggle(800);
});
/*******Скрываем, показываем на комментарии*********/


/*******видео******/
var video = document.querySelector('#video-player');
var play_stop_ref = document.querySelector('.video-buts .play-stop');
var play_button_ref = document.querySelector('.video-buts .play-video-icon');
var stop_button_ref = document.querySelector('.video-buts .stop-video');
var current_time_ref = document.querySelector('.video-buts .current-video-time');
var all_video_time_ref = document.querySelector('.video-buts .all-video-time');

$(".polzunok-time").slider({
    min: 0,
    max: 100,
    value: 0,
    range: "min",
    animate: "fast",
    slide : function(event, ui) 
    {  
    	video.pause();
    	video.currentTime = video.duration*ui.value/100;
    	if(play_button_ref.classList.contains('hide'))
    	{
    		video.play();
    	}
    }    
});

//var b = new Intl.NumberFormat("ru").format($(".polzunok-time").slider("value"));

var no_nois_ref = document.querySelector('.video-buts .no-noise');
var middle_nois_ref = document.querySelector('.video-buts .middle-noise');
var high_nois_ref = document.querySelector('.video-buts .high-noise');
var all_noise = document.querySelectorAll('.video-buts .noise-level');
var radio_button_reff = document.querySelector('.play-video .main-radio');

radio_button_reff.addEventListener('click', No_Noise);

function Hide_All(ref)
{
	for(let item of ref)
	{
		item.classList.add('hide');
	}
}

function Search_Active_Noise_Id()
{
	for(let item of all_noise)
	{
		if(!item.classList.contains('hide'))
		{
			return item.id;
		}
	}
}


function No_Noise()
{
	Hide_All(all_noise);
	no_nois_ref.classList.toggle('no-noise');
	if(!no_nois_ref.classList.contains('no-noise'))
	{
		no_nois_ref.classList.remove('hide');
		$(".polzunok-volume").slider("value",0);
		video.volume = 0;
	}
	else
	{
		$(".polzunok-volume").slider("value",50);
		video.volume = 0.5;
		middle_nois_ref.classList.remove('hide');
	}
	
}


$(".polzunok-volume").slider({
    min: 0,
    max: 100,
    value: 50,
    range: "min",
    animate: "fast",
    slide : function(event, ui) 
    {  
    	video.volume = ui.value/100;
    	Hide_All(all_noise);
    	if(ui.value == 0)
    	{
    		no_nois_ref.classList.remove('hide');
    	}
    	else if(ui.value > 0 && ui.value <= 50)
    	{
    		middle_nois_ref.classList.remove('hide');
    	}
    	else
    	{
    		high_nois_ref.classList.remove('hide');
    	}
    	// console.log(ui.value);
    }    
});

play_stop_ref.addEventListener('click', function(){

	if(stop_button_ref.classList.contains('hide'))
	{
		video.play();
	}
	else
	{
		video.pause();
	}

	play_button_ref.classList.toggle('hide');
	stop_button_ref.classList.toggle('hide');
});

var full_screen_button_ref = document.querySelector('.video-buts .full-screen');
// var open_full_screen_ref = document.querySelector('.video-buts .open-full-screen');
// var close_full_screen_ref = document.querySelector('.video-buts .close-full-screen');

full_screen_button_ref.addEventListener('click', function(){
	this.classList.toggle('active');
	if(this.classList.contains('active'))
	{
		openFullscreen();
	}
	else
	{
		closeFullscreen();
	}
});

// $(document).on('keyup', function(e) {
//   console.log(e.key);
//   if (e.key == "Escape" && full_screen_button_ref.classList.contains('active'))
//   {
//   	full_screen_button_ref.classList.remove('active');
//   }
// });

document.addEventListener('fullscreenchange', ChangeFullScreen);
document.addEventListener('mozfullscreenchange', ChangeFullScreen);
document.addEventListener('MSFullscreenChange', ChangeFullScreen);
document.addEventListener('webkitfullscreenchange', ChangeFullScreen);
var time_wheel = document.querySelector('.polzunok-container-time .ui-slider .ui-slider-handle');
var video_box = document.querySelector('.play-video .video-box');
var counter = 0;

function ChangeFullScreen()
{
	counter++;
	if (full_screen_button_ref.classList.contains('active') && (counter%2 == 0))
	{
		full_screen_button_ref.classList.remove('active');
	}
	time_wheel.classList.toggle('hide');
	video_box.classList.toggle('full-screen-mob');
}

function openFullscreen() 
{
  if (video_box.requestFullscreen) 
  {
    video_box.requestFullscreen();
  }
  else if (video.mozRequestFullScreen) 
  { /* Firefox */
    video.mozRequestFullScreen();
  } 
  else if (video.webkitRequestFullscreen) 
  { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } 
  else if (video.msRequestFullscreen) 
  { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

function closeFullscreen()
{
	if (document.exitFullscreen)
	{
		document.exitFullscreen();
	} 
	else if (document.webkitExitFullscreen) 
	{
		document.webkitExitFullscreen();
	} 
	else if (document.mozCancelFullScreen) 
	{
		document.mozCancelFullScreen();
	} 
	else if (document.msExitFullscreen) 
	{
		document.msExitFullscreen();
	}
}

/**progress**/
video.ontimeupdate = progressUpdate;
video.addEventListener('loadedmetadata', function() {
	let date = new Date(null);
	date.setSeconds(video.duration);
    all_video_time_ref.innerHTML = date.toISOString().slice(14, 19);
    video.volume = 0.5;
    // console.log(date.toISOString());
});

function progressUpdate()
{
	let all_time = video.duration;
	let cur_time = video.currentTime;
	let percent = cur_time/all_time*100;
	//console.log(percent);
	$(".polzunok-time").slider("value",percent);

	let date = new Date(null);
	date.setSeconds(cur_time);
	current_time_ref.innerHTML = date.toISOString().slice(14, 19);
}




/**progress**/



/*******видео******/


/*********************** Попап поделиться ***********************/

$('[data-src="#share-popup"]').fancybox({
	afterLoad : function(){
		$("#share-popup").removeClass('fadeOutDown animated');
		$("#share-popup").addClass('fadeInUp animated');
	},
	beforeClose : function(){
		$("#share-popup").removeClass('fadeInUp animated');
		$("#share-popup").addClass('fadeOutDown animated');
	}
});

var insert_here_reff = document.querySelector('#ref-text');
document.querySelector('#share-video').addEventListener('click', function(){
	let reff = this.dataset.ref;
	insert_here_reff.value = reff;
});

/***********копирование в буфер обмена**********/
document.getElementById("copy-video-ref").onclick = function() {
    var text = document.getElementById("ref-text").value;
    copyTextToClipboard(text);
}

async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Error in copying text: ', err);
    }
}
/***********копирование в буфер обмена**********/

/*********************** Попап поделиться ***********************/

/****************Попап вопросы****************/
$('[data-src="#quest-popup"]').fancybox({
	afterLoad : function(){
		$("#quest-popup").removeClass('fadeOutDown animated');
		$("#quest-popup").addClass('fadeInUp animated');
	},
	beforeClose : function(){
		$("#quest-popup").removeClass('fadeInUp animated');
		$("#quest-popup").addClass('fadeOutDown animated');
	}
});

$("#quest-popup #pop-up-phone").mask("+7(999) 999-9999");

var send_quest_butt = document.querySelector("#send-pop-up-quest");
var error_send_quest = document.querySelector('#quest-popup .form-error');
var quest_mail = document.querySelector('#quest-popup #pop-up-mail');
var quest_phone = document.querySelector('#quest-popup #pop-up-phone');
var quest_mess = document.querySelector('#quest-popup #pop-up-mess');

send_quest_butt.addEventListener('click', Send_Quest)

async function Send_Quest(event)
{
	event.preventDefault();

	var mass = ['#quest-popup #pop-up-mail','#quest-popup #pop-up-mess'];
	var err = await Validate_Forms(mass, 'pop-up-mail', '', '', '', '', '');
	
	var bool = Interpreta_Validate(err,error_send_quest);
	if(bool)
	{
		Send_Quest_Ajax(quest_mail.value, quest_phone.value, quest_mess.value);
	}
}

function Send_Quest_Ajax(mail, phone, mess)
{
	//заглушка	
	document.querySelector("#quest_formm").reset();
	document.querySelector("#quest-popup .fancybox-close-small").click();
}
/****************Попап вопросы****************/

/**Блок высоты меню***/
 var menu = document.querySelector('header .menu');
 var $w = $(window);

//высота окна с учётом скрола
var scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
			);

Calc_Menu_Height();

function Calc_Menu_Height()
{
	if(screen.width < 750)
	{
		var delta = 57;
	}
	else
	{
		var delta = 65;
	}

	scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
			) - delta; 

	window.addEventListener('scroll', function(){
		menu.style.minHeight = scrollHeight + 'px';

		if($w.scrollTop() == 0)
		{
			menu.style.minHeight = '';
		}

	}); 
}
/**Блок высоты меню***/

/*Появление меню*/
var menu_box = document.querySelector("header .menu-box");
var catalog_nav_button = document.querySelector("#catalog_nav_btn");
var main_wraper = document.querySelector(".main-wraper");

if(screen.width > 1000)
{
	
	catalog_nav_button.addEventListener('click', function() {
		menu.classList.toggle('no-active');
		main_wraper.classList.toggle('margin-left-wrap');
	});
}
else
{
	catalog_nav_button.addEventListener('click', function() {
		menu_box.classList.toggle('active');
		body_ref.classList.toggle('overflow-hidden');
	});
}

Click_To_Shade();

function Click_To_Shade()
{
	document.onclick = function (e) {
		if (e.target.className == "menu-shade")
		{
			menu_box.classList.remove('active');
		}
	};
}
/*Появление меню*/

/*Появление всех категорий оборудования меню*/   
var more_catalog_title = document.querySelector("header #more-catalog span");
var more_catalog_arrow = document.querySelector("header #more-catalog svg");
document.querySelector("#more-catalog").addEventListener('click', function() {
	more_catalog_arrow.classList.toggle('active');

	if(more_catalog_arrow.classList.contains('active'))
	{
		more_catalog_title.innerHTML = 'Скрыть';
	}
	else
	{
		more_catalog_title.innerHTML = 'Все категории';
	}
	$('header .catalog-menu-hide').slideToggle(1000);
});
/*Появление всех категорий оборудования меню*/

/**************Попап на регистрацию**************/
function Show_Hide_Something(button_selector, box_selector, hide_class_name)
{
	var box = document.querySelector(box_selector);
	var button = document.querySelector(button_selector);
	button.addEventListener('click', function() {
		box.classList.toggle(hide_class_name);
		Click_Out_Something(box, 'hide', 'mark-class');
	});
}

var form_box_ref = document.querySelector("header .form-box");

First_Come_In_Box_Init();

window.addEventListener('resize', function(){
	First_Come_In_Box_Init();
});

function First_Come_In_Box_Init()
{
	if(screen.width < 750)
	{
		form_box_ref.classList.add('position-fixed-mobile-window');
	}
	else
	{
		form_box_ref.classList.remove('position-fixed-mobile-window');
	}
}

Show_Hide_Something(".private-office .about-registr", ".private-office .about-registr-box", "hide");

/**************Попап на регистрацию**************/

/*********Мобильный поиск лупа**********/
var head_search = document.querySelector('header .head-search');
document.querySelector('header .mobile-loopa').addEventListener('click', function() {
	head_search.classList.add('active');
});

document.querySelector('header .mobile-search-arrow').addEventListener('click', function() {
	head_search.classList.remove('active');
});

/*********Мобильный поиск лупа**********/

/********поисковая строка*****************/
var go_cleare_box = document.querySelector("header .go-to-box");
var head_search_input = document.querySelector("#head-search");
var head_search_cross = document.querySelector("#head-search-cross");
var head_search_vars = document.querySelector("header .head-search-vars");
var head_search_vars_items = document.querySelectorAll("header .head-search-vars .head-search-vars-item");

head_search_input.addEventListener('input', Control_Search_Input);

function Control_Search_Input()
{
	go_cleare_box.classList.add('show_flex');
	if(head_search_input.value.length == 0)
	{
		go_cleare_box.classList.remove('show_flex');
	}

	/**ajax**/
	if(true)//нашёл чтонибудь
	{
		/**СДЕЛАТЬ ПОЯВЛЕНИЕ СТРЕЛКИ**/
		head_search_vars.classList.remove('hide');
		Click_Out_Something(head_search_vars, 'hide', 'mark-class');
	}
}

head_search_input.addEventListener('focus', function(){
	if(head_search_vars_items.length != 0)
	{
		head_search_vars.classList.remove('hide');
		Click_Out_Something(head_search_vars, 'hide', 'mark-class');
	}
});

head_search_cross.addEventListener('click', function(){
	head_search_input.value = '';
	go_cleare_box.classList.remove('show_flex');
});

Fill_Input(head_search_vars_items, head_search_input);

function Fill_Input(vars_reff, input_reff)
{

	for(let item of vars_reff)
	{
		item.addEventListener('click', function(){
			input_reff.value = item.innerHTML;
			head_search_vars.classList.remove('show');
		});
	}
}

/********поисковая строка*****************/


/***********логика личного кабинета*************/
var form_box = document.querySelector("header .form-box");
var come_in_form_email_ref = document.querySelector("header #come-in-form-email");
var come_in_form_passw_ref = document.querySelector("header #come-in-form-password");
var error_come_in_form_ref = document.querySelector("header .come-in-form .form-error");

var form_windows = document.querySelectorAll("header .form-window");
var go_to_office_button = document.querySelector("header #go-to-office");
var go_to_avatar_button = document.querySelector("header #user-ofice");
var registr_buttons = document.querySelectorAll("header .registr-button");
var registr_window = document.querySelector("header .register-form");
var comein_buttons = document.querySelectorAll("header .come-in-buttons");
var remember_pass_buttons = document.querySelectorAll("header .remember-passw");
var remember_password_window = document.querySelector("header .remember-password");
var mobile_shade = document.querySelector("header .mobile-shade");
var body_ref = document.querySelector("body");

mobile_shade.addEventListener('click', Close_Mobile_Forms);
document.querySelector('header #close-form-cross').addEventListener('click', Close_Mobile_Forms);

function Close_Mobile_Forms()
{
	form_box.classList.add('hide');
	$(mobile_shade).slideToggle(300);
	body_ref.classList.toggle('overflow-hidden');
}

$("#registr-phone").mask("+7(999) 999-9999");


var come_in_form_win = document.querySelector("header .come-in-form");
var profile_menu_win = document.querySelector("header .menu-form-author");

go_to_office_button.addEventListener('click',() => Hide_Show_Personal_Area(come_in_form_win));
go_to_avatar_button.addEventListener('click',() =>  Hide_Show_Personal_Area(profile_menu_win));

function Hide_Show_Personal_Area(main_window_ref)
{
	Close_All_Comin_Window();
	main_window_ref.classList.remove('hide');
	if(screen.width < 750)
	{
		body_ref.classList.toggle('overflow-hidden');
		 $(mobile_shade).slideToggle(300);

		 setTimeout(function() {
				form_box.classList.toggle('hide');
		 }, 400);
	}
	else
	{
		form_box.classList.toggle('hide');
	}
	Click_Out_Something(form_box, 'hide', 'mark-class');
}

Switch_Windows(registr_buttons, registr_window);
Switch_Windows(comein_buttons, come_in_form_win);
Switch_Windows(remember_pass_buttons, remember_password_window);

document.querySelector("#come-in").addEventListener('click', () => Come_In(event, come_in_form_email_ref.value, come_in_form_passw_ref.value));


/*******регистрация**********/
var natural_person = document.querySelector("header #natural-person");
var entity = document.querySelector("header #entity");
var company_inn = document.querySelector("header #company-inn");
var registr_phone = document.querySelector("header #registr-phone");

natural_person.addEventListener('click', function(){
	this.classList.add('active');
	entity.classList.remove('active');
	company_inn.classList.add('hide');
	registr_phone.placeholder = 'Телефон (по желанию)';
});

entity.addEventListener('click', function(){
	this.classList.add('active');
	natural_person.classList.remove('active');
	company_inn.classList.remove('hide');
	registr_phone.placeholder = 'Телефон';
});


document.querySelector('header #header-registr').addEventListener('click', function(){
	Close_All_Comin_Window();
	registr_window.classList.remove('hide');
	form_box.classList.remove('hide');

	setTimeout(function() {
		Click_Out_Something(form_box, 'hide', 'mark-class');
	}, 100);
});

var error_register_form_ref = document.querySelector('.register-form .form-error');

document.querySelector("#register").addEventListener('click', Registration)

function Registration(event)
{
	event.preventDefault();

	if(natural_person.classList.contains('active'))
	{
		//console.log('физлицо');
		var mass = ['header #register-form-mail',
					'header #register-form-pass',
					'header #register-form-name'
					];
		var err = Validate_Forms(mass, 'register-form-mail', 'register-form-pass', '', '', '', '');
	}

	if(entity.classList.contains('active'))
	{
		//console.log('юрлицо');
		var mass = ['header #register-form-mail',
		'header #register-form-pass',
		'header #registr-phone',
		'header #company-inn',
		'header #register-form-name'
		];
		var err = Validate_Forms(mass, 'register-form-mail', 'register-form-pass', 'company-inn', '', '', '');
	}

	//console.log(err);

	var bool = Interpreta_Validate(err,error_register_form_ref);

	if(bool)
	{
		//Прописать запись в БД
		Clear_Form(registr_window, error_register_form_ref);
		form_box.classList.add('hide');
	}
}

/*******регистрация**********/

/******Вспомнить пароль***********/
var error_password_form_ref = document.querySelector('.remember-password .form-error');
document.querySelector("#send_pass").addEventListener('click', Remember_Password);
var send_password_window = document.querySelector('header .send-password-window');

function Remember_Password()
{
	event.preventDefault();

	var mass = ['header #email-remember-password'];
	var err = Validate_Forms(mass, 'email-remember-password', '', '', '', '', '');
	var bool = Interpreta_Validate(err,error_password_form_ref);

	if(bool)
	{
		//Прописать запись в БД
		Clear_Form(remember_password_window, error_password_form_ref);
		remember_password_window.classList.add('hide');
		send_password_window.classList.remove('hide');
	}
}

/******Вспомнить пароль***********/

function Clear_Form(form_ref, form_error_ref)
{
	var inputs = form_ref.querySelectorAll('input');
	for(let item of inputs)
	{
		item.value = '';
	}
	form_error_ref.classList.add('hide');
}

function Switch_Windows(buttons_refs, window_ref)
{
	for(let item of buttons_refs)
	{
		item.addEventListener('click', function(){
			Close_All_Comin_Window();
			window_ref.classList.remove('hide');
		});
	}
}

function Check_Password_Db(password)//если есть пароль в базе данных, то возвращает true
{
	return true;
}

function Check_Mail_Db(mail)//если есть почта в базе данных, то возвращает true
{
	return false;
}

function Validate_Forms(arr, email_id, passw_id, inn_id, old_password_id, repeat_password_id, file_ava_id)
{
	var err= [0,0]; //1-количество ошибок, 2 - код ошибки (-1==email, ... )
	var pattern_mail = /\S+@\S+\.\S+/;//для почты
	var pattern_passw = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;//для пароля

	for (let item of arr)
	{
		let inp_value = $(item).val();
		let main_bool = (inp_value == '');
		let inp_id = $(item).attr("id");

		if(inp_id == email_id)
		{
			if(main_bool)
			{
				bool = main_bool;
			}
			else
			{
				bool_unique = Check_Mail_Db(inp_value);
				bool = (!pattern_mail.test(inp_value));
				if(bool)
				{
					err[1] = -1;//код ошибки почта, не верный формат
				}
				else if(bool_unique)
				{
					bool = bool_unique;
					err[1] = -11;//код ошибки почта, уже есть такая
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else if(inp_id == passw_id)
		{
			if(main_bool)
			{
				bool = main_bool;
			}
			else
			{
				bool = (!pattern_passw.test(inp_value));
				if(bool)
				{
					err[1] = -2;//код ошибки пароля
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else if(inp_id == inn_id)
		{
			if(main_bool)
			{
				bool = main_bool;
			}
			else
			{
				bool = (inp_value.length != 10);
				if(bool)
				{
					err[1] = -3;//код ошибки инн
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else if(inp_id == old_password_id)
		{
			if(main_bool)
			{
				bool = main_bool;
			}
			else
			{
				bool = !Check_Password_Db(inp_value);//ложное условие
				if(bool)
				{
					err[1] = -4;//код ошибки проверка пароля в базе
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else if(inp_id == repeat_password_id)
		{
			if(main_bool)
			{
				bool = main_bool;
			}
			else
			{
				let first_input_value = document.querySelector('header #' + passw_id).value;
				bool = (inp_value != first_input_value);
				if(bool)
				{
					err[1] = -5;//код ошибки подтверждение пароля
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else if(inp_id == file_ava_id)
		{
			// console.log(777);
			var inp_files_ref = document.querySelector('#'+file_ava_id);
			if(inp_files_ref.files.length == 0)
			{
				continue;
			}
			else
			{
				var [file] = inp_files_ref.files;
				let max_img_size = 20*1048576;//в байтах
				bool = (file.size > max_img_size) || ((file.type).indexOf('image') == -1);
				if(bool)
				{
					err[1] = -6;//код ошибки подтверждение пароля
				}
				// else
				// {
				// 	err[1] = 0;
				// }
			}
		}
		else 
		{
			bool = main_bool;
		}

		if (bool)
		{
			err[0]++;
			$(item).addClass("error");
		} 
		else 
		{
			$(item).removeClass("error");
		}
	}

	return err;
}

function Interpreta_Validate(err_mass,err_ref)
{
	if(err_mass[1] == -1)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Заполните почту корректно';
		return false;
	}
	else if(err_mass[1] == -11)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Такая почта уже есть в базе данных, введите другую';
		return false;
	}
	else if(err_mass[1] == -2)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Пароль должен состоять минимум из 6 символов,'+ 
							'содержать цифру,'+ 
							'содержать заглавную и строчную буквы английского алфавита,'+
							'содержать cимвол, не являющийся буквенно-цифровым';
		return false;
	}
	else if(err_mass[1] == -3)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'ИНН должен состоять из 10 цифр';
		return false;
	}
	else if(err_mass[1] == -4)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Ввели не правильный старый пароль';
		return false;
	}
	else if(err_mass[1] == -5)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Не правильно подтвердили пароль';
		return false;
	}
	else if(err_mass[1] == -6)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Размер файла должен быть меньше 20 мб и он должен быть в формате изображения';
		return false;
	}
	else if(err_mass[0] > 0)
	{
		err_ref.classList.remove('hide');
		err_ref.innerHTML = 'Заполните все поля';
		return false;
	}
	else if(err_mass[0] == 0 && err_mass[1] == 0)
	{
		err_ref.classList.add('hide');
		return true;
	}
}

//error_come_in_form_ref

var no_author_form = document.querySelector('.form-box .no-author');
var author_form = document.querySelector('.form-box .author');
var about_reg = document.querySelector('header .about-registr');
var commentary_box_input = document.querySelector('.play-video .commentary-box-input');
var comments_line = document.querySelector('.play-video .comments-line');
var recommends = document.querySelector('.play-video .login-register-box');

function Come_In(event, email, password)
{
	event.preventDefault();

	var mass = ['header #come-in-form-email','header #come-in-form-password'];
	var err = Validate_Forms(mass, 'come-in-form-email', '', '', '', '', '');

	//console.log(err);

	var bool = Interpreta_Validate(err,error_come_in_form_ref);
	
	if(bool)
	{
		if(Validate_Email_Password(email, password))
		{
			go_to_office_button.classList.add('hide');
			go_to_avatar_button.classList.remove('hide');
			form_box_ref.classList.add('hide');
			no_author_form.classList.add('hide');
			author_form.classList.remove('hide');
			about_reg.classList.add('hide');
			commentary_box_input.classList.remove('hide');
			comments_line.classList.remove('hide');
			recommends.classList.add('hide');
			if(screen.width < 750)
			{
				Close_Mobile_Forms();
			}
		}
		else
		{
			error_come_in_form_ref.classList.remove('hide');
			error_come_in_form_ref.innerHTML = 'Не правильный логин или пароль';
			come_in_form_email_ref.classList.add('error');
			come_in_form_passw_ref.classList.add('error');
		}
	}
}

function Validate_Email_Password(email, password)
{
	//заглушка
	if(email == 'gubin@mail.ru' && password == '1Ww####')
	{
		return true;
	}
	else
	{
		return false;
	}	
}

function Close_All_Comin_Window()
{
	for(let win of form_windows)
	{
		win.classList.add('hide');
	}
}

/***********логика личного кабинета*************/

function Click_Out_Something(hide_box_ref, hide_class, mark_class)
{
	if(!hide_box_ref.classList.contains(hide_class))
	{
		document.onclick = function (e) {
			let all_classes = e.target.className;
			//console.log(all_classes);
			if (!all_classes.includes(mark_class))
			{
				hide_box_ref.classList.add(hide_class);
			}
		};
	}
}


/*************для авторизованого пользователя*************/
var change_name_ava_button = document.querySelectorAll("header .change-name-ava");
var change_name_ava_form = document.querySelector("header .change-name-ava-form");
var go_to_menu_auth_buttons = document.querySelectorAll("header .go-to-menu-auth");
var change_password_buttons = document.querySelectorAll("header .change-password-menu");
var change_password_form = document.querySelector('header .change-password-form');

Switch_Windows(change_name_ava_button, change_name_ava_form);
Switch_Windows(go_to_menu_auth_buttons, profile_menu_win);
Switch_Windows(change_password_buttons, change_password_form);

var error_name_ava_form_ref = document.querySelector('header .change-name-ava-form .form-error');

document.querySelector('header #change-ava-name').addEventListener('click', Change_Ava_Name);

function Change_Ava_Name(event)
{
	event.preventDefault();
	var mass = ['header #change-name', 'header #file-input-ava'];
	var err = Validate_Forms(mass, '', '', '', '', '', 'file-input-ava');
	var bool = Interpreta_Validate(err,error_name_ava_form_ref);
	
	if(bool)
	{
		Change_Ava_Name_Ajax();
	}
}

var header_ava = document.querySelector('header .user-ava img');
var comment_ava = document.querySelector('.play-video .ava-box img');
var form_ava = document.querySelector('header .ava-img-option');
var user_name_head = document.querySelector('header .user-name');
var user_name_form = document.querySelector('header .name-mail .come-in-title');

function Change_Ava_Name_Ajax()
{
	//заглушка
	const [file] = file_ava_input.files;
	if(file)
	{
		var src_file = URL.createObjectURL(file);
		header_ava.src = src_file;
		comment_ava.src = src_file;
		form_ava.src = src_file;
	}
	
	var new_name = document.querySelector('#change-name').value;
	user_name_head.innerHTML = new_name;
	user_name_form.innerHTML = new_name;

	//Clear_Form(change_name_ava_form, error_name_ava_form_ref);
	error_name_ava_form_ref.classList.add('hide');

	if(screen.width < 750)
	{
		Close_Mobile_Forms();
	}
	else
	{
		form_box.classList.add('hide');
	}
}

document.querySelector('header #change-password-button').addEventListener('click', Change_Password);

var error_change_pass_form_ref = document.querySelector('header .change-password-form .form-error');

function Change_Password(event)
{
	event.preventDefault();

	var mass = ['header #old-password',
				'header #new-password',
				'header #repeat-password'
	];

	var err = Validate_Forms(mass, '', 'new-password', '', 'old-password', 'repeat-password', '');
	var bool = Interpreta_Validate(err, error_change_pass_form_ref);
	
	if(bool)
	{
		Clear_Form(change_password_form, error_change_pass_form_ref);
		if(screen.width < 750)
		{
			Close_Mobile_Forms()
		}
		else
		{
			form_box.classList.add('hide');
		}
	}
}

document.querySelector('header #log-out-profile').addEventListener('click', Log_Out_Profile);

function Log_Out_Profile()
{
	//заглушка
	location.reload();
}

document.querySelector('header #load-ava').addEventListener('click', Load_Ava);
var file_ava_input = document.querySelector('header #file-input-ava');
var name_first_latter = document.querySelector('header .first-latter.change-form');
var ava_img = document.querySelector('header .ava-img-option.change-form');

function Load_Ava(event)
{
	event.preventDefault();
	file_ava_input.click();

	file_ava_input.onchange = evt => {
		const [file] = file_ava_input.files;
		if (file) 
		{
		  name_first_latter.classList.add('hide');
		  ava_img.src = URL.createObjectURL(file);
		  ava_img.classList.remove('hide');
		}
	}
}

/*************для авторизованого пользователя*************/


/*******Отправка комментариев к видео***********/
var comm_input = document.querySelector('.play-video #comment-video-input');
var send_arrow = document.querySelector('.play-video .comment-arrow');
var num_comms = document.querySelector('.play-video #number-of-comments');
var comm_line = document.querySelectorAll('.play-video .comments-line');
var mobile_send_button = document.querySelector(".play-video #send-comment");

send_arrow.addEventListener('click', Send_Wrapper);
mobile_send_button.addEventListener('click', Send_Wrapper);

function Send_Wrapper()
{
	var text = (comm_input.value).trim();
	if (text != '')
	{
		Send_Comment_Ajax(text);
	}
}

var insert_here = document.querySelector('.play-video .commentary-box');

function Send_Comment_Ajax(text)
{
	//заглушка
	let date = new Date();
	var cur_date = date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear();

	const [file] = file_ava_input.files;
	if (file) 
	{
		var src_file = URL.createObjectURL(file);
	}
	else
	{
		var src_file = 'img/ava.png';
	}

	var name = document.querySelector('header .user-name').innerHTML;

	let comment = '';
					comment = `
						<div class="commentary-item">
							<div class="user-ava ava-box">
								<img src="${src_file}">
							</div>

							<div class="commentary-text-box">
								<div class="author-date">
									<span class="commentary-athor">${name}</span>
									<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="2" cy="2" r="2" fill="#7F8692"></circle>
									</svg>
									<span class="commentary-date">${cur_date}</span>
								</div>

								<div class="commentary-text">
									${text}
								</div>
							</div>
						</div>
					`;

				//var comment_pars = new DOMParser().parseFromString(comment, "text/xml");
				var wrapper= document.createElement('div');
				wrapper.innerHTML=comment;
				insert_here.insertBefore(wrapper, insert_here.firstElementChild);
				//insert_here.appendChild(wrapper);
				comm_input.value = '';
				let new_value = parseInt(num_comms.innerHTML) + 1;
				num_comms.innerHTML = new_value + ' комментари' + Return_Ending(new_value,'й','я','ев');
				// comm_line.classList.remove('hide');
}

function Return_Ending(number,one,two,three)
{
	var str = String(number);
	var len = str.length;
	if(len == 1)
	{
		str = '0'+str;
		len = 2;
	}
	$bool = (str[len-1] == '2') || (str[len-1] == '3') || (str[len-1] == '4');
	if(str[len-1] == '1' && str[len-2] != '1')
	{
		return one;
	}
	else if($bool && str[len-2] != '1')
	{
		return two;
	}
	else
	{
		return three;
	}
}

/*******Отправка комментариев к видео***********/

var go_to_ofice = document.querySelectorAll(".play-video .reff-top");

for(let item of go_to_ofice)
{
	item.addEventListener('click', function(){
		window.scrollTo({top: 0, behavior: 'smooth'});
	});
}
