(function ($) {
    "use strict";
    $('#one_way').on('click', function () {
        $('.mage_return_date').slideUp(300).removeClass('mage_hidden').find('input').val('');
    });
    $('#return').on('click', function () {
        $('.mage_return_date').slideDown(300).removeClass('mage_hidden');
    });
    $('.mage_input_select .mage_route_list li').on('hover , click', function () {
        let route = $(this).attr('data-route');
        $(this).parents('.mage_input_select').find('input').val(route);
    });
    $('.mage_input_select input').on({
        keyup: function () {
            let input = $(this).val().toLowerCase();
            $(this).siblings('ul.mage_route_list').find('li').filter(function () {
                $(this).toggle($(this).attr('data-route').toLowerCase().indexOf(input) > -1);
            });
        },
        blur: function () {
            let input = $(this).val().toLowerCase();
            let flag = 0;
            $(this).siblings('ul.mage_route_list').find('li').filter(function () {
                if ($(this).attr('data-route').toLowerCase() === input) {
                    flag = 1;
                }
            });
            if (flag < 1) {
                $(this).val('');
            }
        },
        click: function () {
            $(this).siblings('ul.mage_route_list').find('li').slideDown(200);
        }
    });
    $('.mage_form_group input.mage_form').on('keyup keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
        let target = $(this);
        let value = parseInt(target.val());
        mageTicketQty(target, value);
    });
    $('.mage_qty_dec').on('click', function () {
        let target = $(this).siblings('input');
        let value = (parseInt(target.val()) - 1) > 0 ? (parseInt(target.val()) - 1) : 0;
        mageTicketQty(target, value);
    });
    $('.mage_qty_inc').on('click', function () {
        let target = $(this).siblings('input');
        let value = parseInt(target.val()) + 1;
        mageTicketQty(target, value);
    });

    $('button.mage_book_now').on('click', function () {

        $(this).parents('.mage_search_list').find('.mage-seat-available').hide();
        let ticket = 0;
        let currentTarget = $(this).parents('.mage_search_list').find('.mage_form[data-price]');
        let seat_available = $(this).parents('.mage_search_list').attr('data-seat-available');
        currentTarget.each(function (index) {
            ticket += parseInt($(this).val());
        });
        var pic_ele = $(this).parents('.mage_search_list').find('select[name="mage_pickpoint"]');
        var pickpoint = $(this).parents('.mage_search_list').find('select[name="mage_pickpoint"] option:selected').val();

        if (ticket > parseInt(seat_available)) {
            $(this).parents('.mage_search_list').find('.mage-seat-available').show();
            return false;
        }
        if (ticket > 0) {
            // Pickup Point Validation
            if (pic_ele.children().length > 0) {
                if (pickpoint != '') { // Pass
                    mageSubTotal(currentTarget);
                    $(this).siblings('button.single_add_to_cart_button').trigger('click');
                } else { // Fail
                    $(this).parents('.mage_search_list').find('select[name="mage_pickpoint"]').addClass('mage_error').trigger('focus');
                }
            } else {
                mageSubTotal(currentTarget);
                $(this).siblings('button.single_add_to_cart_button').trigger('click');
            }
        } else {
            currentTarget.addClass('mage_error').trigger('focus');
        }
    });

    // Search Form Actions
    $(document).on('click', function (event) {
        let selectUl = $('.mage_input_select_list');
        if (!$(event.target).parents().hasClass('mage_input_select') && selectUl.is(':visible')) {
            let target = $('.mage_input_select input');
            target.each(function (index) {
                let input = $(this).val().toLowerCase();
                let flag = 0;
                $(this).parents('.mage_input_select').find('li').filter(function () {
                    if ($(this).attr('data-route').toLowerCase() === input) {
                        flag = 1;
                        mage_bus_dropping_point(selectUl);
                    }
                });
                if (flag < 1) {
                    $(this).val('');
                }
            });
            selectUl.slideUp(200);
        }
    });
    $(document).on({
        keyup: function () {
            let input = $(this).val().toLowerCase();
            $(this).parents('.mage_input_select').find('.mage_input_select_list').find('li').filter(function () {
                $(this).toggle($(this).attr('data-route').toLowerCase().indexOf(input) > -1);
            });
        },
        click: function () {
            $(this).parents('.mage_input_select').find('.mage_input_select_list').slideDown(200);
            $(this).parents('.mage_input_select').find('.mage_input_select_list_static').slideDown(200);
            $(this).parents('.route-input-wrap').addClass('activeMageSelect');
            if ($(this).parents('.mage_input_select').hasClass('mage_bus_boarding_point')) {
                if ($('.mage_bus_dropping_point').find('.route-input-wrap').hasClass('activeMageSelect')) {
                    $('.mage_bus_dropping_point').find('.route-input-wrap').removeClass('activeMageSelect');
                    $('.mage_bus_dropping_point').find('.mage_input_select_list').slideUp(200);
                    $('.mage_bus_dropping_point').find('.mage_input_select_list_static').slideUp(200);
                }
            }
        },
        blur: function () {
            $(this).parents('.route-input-wrap').removeClass('activeMageSelect');
        }
    }, '.mage_input_select input');

    $(document).on({
        click: function () {
            let route = $(this).attr('data-route');
            $(this).parents('.mage_input_select_list').slideUp(200).parents('.mage_input_select').find('input').val(route);
            mage_bus_dropping_point($(this));
            $(this).parents('.mage_input_select_list').siblings('.route-input-wrap').removeClass('activeMageSelect');
        }
    }, '.mage_input_select_list li');

    $(document).on({
        click: function () {
            let route = $(this).attr('data-route');
            $(this).parents('.mage_input_select_list_static').slideUp(200).parents('.mage_input_select').find('input').val(route);
            mage_bus_dropping_point($(this));
            $(this).parents('.mage_input_select_list_static').siblings('.route-input-wrap').removeClass('activeMageSelect');
        }
    }, '.mage_input_select_list_static li');

    // Minimul Design Script
    $(document).on({
        click: function () {
            var $this = $(this);
            $this.parents('.mage-search-brief-row').toggleClass('opened');
            $this.parents('.mage-search-brief-row').siblings('.mage-bus-booking-wrapper').slideToggle('fast');
        }
    }, '.mage-bus-detail-action');
    // Minimul Design Script END

    function mage_bus_dropping_point(target) {
        if (target.parents().hasClass('mage_bus_boarding_point')) {
            var boarding_point = target.attr('data-route');

            if (boarding_point != undefined) {
                $.ajax({
                    type: 'POST',
                    // url: wbtm_ajax.wbtm_ajaxurl,
                    url: wbtm_ajaxurl,
                    data: { "action": "wbtm_load_dropping_point", "boarding_point": boarding_point },
                    beforeSend: function () {
                        $('#bus_end_route').val('');
                        $('#wbtm_dropping_point_list').slideUp(200);
                        $('#wbtm_show_msg').show();
                        $('#wbtm_show_msg').html('<span>Loading..</span>');
                    },
                    success: function (data) {
                        $('#wbtm_show_msg').hide();
                        $('#bus_end_route').val('');
                        $('.mage_bus_dropping_point .mage_input_select_list ul').html(data);
                        // $('#wbtm_dropping_point_list').slideDown(200);
                        $('#bus_end_route').trigger('click');
                        $('#wbtm_dropping_point_list').siblings('.route-input-wrap').addClass('activeMageSelect');
                    }
                });
                return false;
            }
        }
    }

    function mageTicketQty(target, value) {
        let minSeat = parseInt(target.attr('min'));
        let maxSeat = parseInt(target.attr('max'));
        target.siblings('.mage_qty_inc , .mage_qty_dec').removeClass('mage_disabled');
        if (value < minSeat || isNaN(value) || value === 0) {
            value = minSeat;
            target.siblings('.mage_qty_dec').addClass('mage_disabled');
        }
        if (value > maxSeat) {
            value = maxSeat;
            target.siblings('.mage_qty_inc').addClass('mage_disabled');
        }
        target.val(value);
        mageError(value, target);
        mageSubTotal(target);
    }

    function mageError(value, target) {
        if (value > 0) {
            target.removeClass('mage_error');
        } else {
            target.addClass('mage_error').trigger('focus');
        }
    }
    function mageSubTotal(target) {

        let currentTarget = target.parents('.mage_search_list');
        let subTotal = 0;
        currentTarget.find('.mage_form[data-price]').each(function (index) {
            let unitPrice = parseFloat($(this).attr('data-price'));
            let ticket = parseFloat($(this).val());
            subTotal = subTotal + (unitPrice * ticket > 0 ? unitPrice * ticket : 0);
        });
        currentTarget.find('.mage_sub_total span').html(subTotal);
        mageCustomerInfoForm(currentTarget);
    }

    function mageCustomerInfoForm(target) {
        if (target.children().hasClass('mage_hidden_customer_info_form')) {
            target.find('.mage_form[data-price]').each(function (index) {
                let mageTicketType = $(this).attr('data-ticket-type');
                console.log(mageTicketType);
                let mageTargetClass = '.' + mageTicketType;
                let currentTarget = target.find(mageTargetClass);
                let ticketQTy = parseInt($(this).val());
                if (ticketQTy < 1) {
                    currentTarget.empty().slideUp(500);
                } else {
                    let currentFormLength = currentTarget.find('.mage_form_list').length;
                    if (currentFormLength < ticketQTy) {
                        let mageTicketTitle = $(this).attr('data-ticket-title');
                        for (let i = currentFormLength; i < ticketQTy; i++) {
                            target.find('.mage_hidden_customer_info_form h4').html(mageTicketTitle + (i + 1));
                            target.find('.mage_hidden_customer_info_form input[name="wbbm_user_type[]"]').val(mageTicketType);
                            let mageFormInfo = target.find('.mage_hidden_customer_info_form').html();
                            currentTarget.append(mageFormInfo).slideDown('fast').find('.mage_form_list').slideDown(500);
                        }
                    }
                    if (currentFormLength > ticketQTy) {

                        while (currentFormLength > ticketQTy) {
                            currentTarget.find('.mage_form_list:last-child').slideUp(500).remove();
                            currentFormLength = currentTarget.find('.mage_form_list').length;
                        }
                    }
                }
            });
        }
        else {
            target.find('.mage_customer_info_area .child').html('<input type="hidden" name="custom_reg_user" value="no" />');
        }
    }


}(jQuery));