

fn = {
    base : "http://fdrive.in/ci/welcome/",
    recomendations: function () {
        $('.area').html("Loading.....");
        $.post(fn.base + "myPotentialReferrals")
        //$.post(fn.base + "recomendation")
            .done(function (response) {
                var newRes = JSON.parse(response);
                $('.area').html("");
                //$('.area').html(response);
                $.map(newRes, function (x) {
                    $('.area').append("<div class = 'item'>" +
                    "<div class = 'left'>" +
                    "<h2>"+ x.name+"</h2>" +
                    "<p>"+ x.title+"</p>" +
                    "<p>"+ x.company+"</p>" +
                    "</div>" +
                    "<div class = 'right'>" +
                    "<button class = 'refer' data-link = '"+ x.link+"'>Refer</button>" +
                    "</div>"+
                    "</div>");
                })
            })
            .always(function () {
                fn.referFriend();
            });
    },
    referals: function () {
        $('.area').html("Loading.....");
        //$.post(fn.base + "myPotentialReferrals")
        $.post(fn.base + "recomendation")
            .done(function (response) {
                var newRes = JSON.parse(response);
                $('.area').html("");
                //$('.area').html(response);
                $.map(newRes.data, function (x) {
                    $('.area').append("<div class = 'item'>" +
                    "<div class = 'left'>" +
                    "<h2>"+ x.name+"</h2>" +
                    "<p>"+ x.title+"</p>" +
                    "<p>"+ x.company+"</p>" +
                    "</div>" +
                    "<div class = 'right'>" +
                    "<button class = 'refer' data-link = '"+ x.link+"'>Refer</button>" +
                    "</div>"+
                    "</div>");
                })
            })
            .always(function () {
                fn.referFriend();
            });
    },
    mySkills: function () {
        $('.area').html("Loading.....");
        //$.post(fn.base + "myPotentialReferrals")
        $.post(fn.base + "mySkills")
            .done(function (response) {
                var newRes = JSON.parse(response);
                $('.area').html("");
                //$('.area').html(response);
                $.map(newRes.data, function (x) {
                    $('.area').append("<button class = 'skill' >"+x+"</button>");
                })
            })
            .always(function () {
                fn.referFriend();
            });
    },
    myJobs: function () {
        $('.area').html("Loading.....");
        //$.post(fn.base + "myPotentialReferrals")
        $.post(fn.base + "myReferrals")
            .done(function (response) {
                var newRes = JSON.parse(response);
                $('.area').html("");
                //$('.area').html(newRes);
                $.map(newRes.data, function (x) {
                    $('.area').append("<div class = 'item'>" +
                    "<div class = 'left'>" +
                    "<h2>" + x.job.title + "</h2>" +
                    "<p>" + x.job.company + "</p>" +
                    "<a href='" + x.job.company_url + "' target='_blank'>Web Site</a>" +
                    "<a href='" + x.job.job_url + "' target='_blank'>Job Details</a>" +
                    "</div>" +
                    "<div class = 'right'>" +
                    "<img src = '" + x.job.logo + "' width = '65px'/>" +
                    "</div>" +
                    "</div>");
            })
            })
            .always(function () {
                //fn.referFriend();
            });
    },

    referFriend: function () {
        $(document).on("click","button.refer", function () {
            $.post(fn.base+"referAfriend",{link:$(this).data("link")})
                .done(function (response) {
                    console.log(response);
                });
        });
    },

    menuSlide:function(){
        $('.rightImage').click(function () {
            var high = $('.frostMenu').css("top");
            if(parseInt(high) < 1){
                $('.frostMenu').addClass("animated bounceInDown").show();
            }
        });
        $('span.close').click(function () {
            $('.frostMenu').removeClass("animated bounceInDown");
            $('.frostMenu').addClass("animated bounceOutUp");
            setTimeout(function(){
                $('.frostMenu').removeClass("animated bounceOutUp").hide();
            }, 1200);
        });
    },

    menuAccess:function(){
        $('.frostMenu ul li').click(function () {
            var item = $(this).data("item");
            switch(item){
                case 'referal':
                    fn.referals();
                    break;
                case 'recomendation':
                    fn.recomendations();
                    break;
                case 'myskill':
                    fn.mySkills();
                    break;
                case 'myrecomendation':
                    fn.myJobs();
                    break;

            }
            $('.frostMenu').removeClass("animated bounceInDown");
            $('.frostMenu').addClass("animated bounceOutUp");
            setTimeout(function(){
                $('.frostMenu').removeClass("animated bounceOutUp").hide();
            }, 1200);
        });
    },

    execute: function () {
        fn.recomendations();
        //fn.myJobs();
        fn.menuSlide();
        fn.menuAccess();

    }
}

fn.execute();
