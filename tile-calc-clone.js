/* CTM Tile Calculator — indistinguishable modal clone.
   Reuses the site's OWN Magento modal widget + the native markup/classes,
   so the theme CSS styles it identically to the control modal. */
(function () {
  if (window.__tileCalcCloneBuilt) { window.openTileCalcClone && window.openTileCalcClone(); return; }
  window.__tileCalcCloneBuilt = true;

  require(['jquery', 'Magento_Ui/js/modal/modal'], function ($, modal) {

    /* ---- product config, read from the same hidden fields the native calc uses ---- */
    var umren = parseFloat($('#umren').val()) || 0;              // 25  (tiles/qty ratio numerator)
    var umrez = parseFloat($('#umrez').val()) || 0;              // 63
    var M2_PER_BOX = (umren && umrez) ? (umrez / umren) : 2.52;  // 63/25 = 2.52 m² per box

    /* ---- clone the native markup so classes (and therefore styling) match exactly ---- */
    var $content = $('#tile_calc_modal').first().clone();
    $content.attr('id', 'tile_calc_modal_clone').removeClass('hidden').css('display', '');
    $content.find('.area-calculator').removeClass('hidden');       // reveal the calculator body
    // suffix inner ids so they don't collide with the hidden native copy still in the DOM
    $content.find('[id]').each(function () {
      if (this.id !== 'tile_calc_modal_clone') this.id += '_c';
    });
    $content.appendTo('body');

    /* ---- create the modal with the EXACT native options → identical chrome/animation/CSS ---- */
    modal({
      type: 'popup',
      modalClass: 'area-calculator-wrap',   // <-- same class the control uses; theme styles it identically
      responsive: true,
      innerScroll: false,
      title: 'Tile Calculator',
      buttons: [{
        text: $.mage.__('Cancel'),
        class: 'btn-cancel',
        displayArea: 'modal-content',
        click: function () { this.closeModal(); }
      }]
    }, $content);

    /* ---- helpers ---- */
    function fmt(n) { return (!isFinite(n) || n === 0) ? '0' : n.toFixed(2); }  // control shows 2 decimals

    function setField(sel, val) {                 // set a real qty field + fire the events the site listens for
      var el = document.querySelector(sel);
      if (!el) return;
      el.value = val;
      ['input', 'keyup', 'change'].forEach(function (t) { el.dispatchEvent(new Event(t, { bubbles: true })); });
      if (window.jQuery) window.jQuery(el).val(val).trigger('change');
    }

    /* ---- add / remove area rows ---- */
    var rowSeq = 1;
    function bindRow($row) {
      $row.find('.room-w, .room-l').off('.calc').on('input.calc keyup.calc change.calc', recalc);
    }
    $content.find('#add_room_btn_c').off('.calc').on('click.calc', function (e) {
      e.preventDefault();
      rowSeq++;
      var $row = $content.find('.sin-ro').first().clone();
      $row.attr('id', 'room_' + rowSeq + '_c');
      $row.find('.room-w').val('').attr('id', 'room_width_' + rowSeq + '_c');
      $row.find('.room-l').val('').attr('id', 'room_length_' + rowSeq + '_c');
      $row.find('.area-res p').last().html('0<span>m<sup>2</sup></span>');
      $content.find('.area-calculator-input').append($row);
      bindRow($row);
      recalc();
    });

    /* ---- the calculation (matches native: area = w×l, +10%, boxes = ceil(area×1.1 / m²perBox)) ---- */
    function recalc() {
      var total = 0;
      $content.find('.sin-ro').each(function () {
        var w = parseFloat($(this).find('.room-w').val()) || 0;
        var l = parseFloat($(this).find('.room-l').val()) || 0;
        var a = w * l;
        total += a;
        $(this).find('.area-res p').last().html(fmt(a) + '<span>m<sup>2</sup></span>');
      });
      var extra      = total * 0.1;                                  // 10% extra ONLY  → control: 120.00
      var withExtra  = total * 1.1;                                  // padded area (drives boxes + area4) → 1320.00
      var boxes      = total > 0 ? Math.ceil(withExtra / M2_PER_BOX) : 0;

      $content.find('.area1 .total-value').html(fmt(total) + '<span> square meters</span>');
      $content.find('.area2 .total-value').html(fmt(extra) + '<span> square meters</span>');
      $content.find('.area4 .total-value').text(boxes + ' boxes = ' + fmt(withExtra) + ' square meters');
      $content.find('.total-boxes-value').text(boxes);

      // button text swap: "Add to Cart" (0 boxes) → "Add N boxes to my Cart" (like the control)
      var $spans = $content.find('.add-to-cart-btn').children('span');
      $spans.first().css('display', boxes > 0 ? 'none' : '');
      $spans.last().css('display',  boxes > 0 ? '' : 'none');

      $content.data('boxes', boxes).data('boxesArea', withExtra);
    }

    /* ---- Add to Cart: push the result into the real qty fields, fire events, submit ---- */
    $content.find('.add-to-cart-btn').off('.calc').on('click.calc', function (e) {
      e.preventDefault();
      var boxes = $content.data('boxes') || 0;
      if (!boxes) return;
      setField('#qty-box', boxes);                       // boxes into the box field
      setField('#area_to_cover', $content.data('boxesArea'));  // m² into the area field
      $('#product_addtocart_form').trigger('submit');    // let Magento's native ATC/validation run
    });

    /* ---- take over the trigger so OUR modal opens instead of the native one ---- */
    var btn = document.getElementById('calc_btn');
    if (btn) {
      var fresh = btn.cloneNode(true);                   // cloning strips the native click handler
      btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener('click', function (e) { e.preventDefault(); recalc(); $content.modal('openModal'); });
    }

    /* ---- init + manual hook ---- */
    window.openTileCalcClone = function () { recalc(); $content.modal('openModal'); };
    bindRow($content.find('.sin-ro').first());
    recalc();
    console.log('[tile-calc clone] ready — m²/box =', M2_PER_BOX, '· click "Tile Calculator" or run openTileCalcClone()');
  });
})();
