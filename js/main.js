window.onload = () => {
  const loader = {
    init:function(){
      this.loading();
    },
    loading:function(){
      const loader = document.querySelector('.loader');

      function loaded() {
        loader.classList.add('active');
      }

      setTimeout(loaded, 100)
    }
  }
  loader.init();

  const toggleButton = {
    init: function () {
      this.toggleButton('.nav-button', '.header-nav');
    },
    toggleButton: function (buttons, items) {
      const buttonToggle = document.querySelectorAll(buttons);
      const itemsToggle = document.querySelectorAll(items);

      buttonToggle.forEach(button => button.addEventListener('click', () => {
        buttonToggle.forEach(i => i.classList.toggle('active'));
        itemsToggle.forEach(i => i.classList.toggle('active'));
      }))
    }
  }
  toggleButton.init();
  
  const countUp = {
    init: function () {
      this.countUp('.about-count', '.number');
    },
    countUp: function (selfItem, itemNumber) {
      const self = document.querySelectorAll(selfItem);
      const time = 2000;

      self.forEach(i => {
        const items = i.querySelectorAll(itemNumber);

        let counter = 0;

        function countUp(item) {
          let step = Math.ceil(item.dataset.count / time);
          item.innerHTML = counter + '+';
          counter = counter + step;;

          if (counter < item.dataset.count) {
            setTimeout(function () {
              countUp(item);
            }, 1)
          } else if (counter >= item.dataset.count) {
            item.innerHTML = item.dataset.count + '+';
          }
        }

        const options = {
          threshold: 0.5,
          rootMargin: "0px",
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            } else {
              countUp(entry.target);
              observer.unobserve(entry.target);
            }
          })
        }, options);

        items.forEach(item => {
          observer.observe(item);
        })
      })

    }
  }
  countUp.init();

  const validation = {
    init:function(){
      this.validate();
    },
    validate: function() {
      const form = document.querySelector('form');
      if (form === null) return;
      const name = document.querySelector('form #name');
      const errorName = document.querySelector('form #errorName');

      const email = document.querySelector('form #email');
      const errorEmail = document.querySelector('form #errorEmail');

      const phone = document.querySelector('form #phone');
      const errorPhone = document.querySelector('form #errorPhone');

      function validateName(value) {
        if (value.length === 0) {
          errorName.innerHTML = 'Bạn phải nhập đầy đủ Họ tên !';
          errorName.classList.remove('correct');
          errorName.classList.add('not-correct');
          return false;
        }
        else {
          errorName.innerHTML = 'Hợp lệ !';
          errorName.classList.remove('not-correct');
          errorName.classList.add('correct');
          return true;
        }
      }

      function validateEmail(value) {
        if (value.length === 0) {
          errorEmail.innerHTML = 'Bạn phải nhập đầy đủ Email !';
          errorEmail.classList.remove('correct');
          errorEmail.classList.add('not-correct');
          return false;
        }
        else if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g.test(value)) {
          errorEmail.innerHTML = 'Email không hợp lệ !';
          errorEmail.classList.remove('correct');
          errorEmail.classList.add('not-correct');
        }
        else {
          errorEmail.innerHTML = 'Hợp lệ !';
          errorEmail.classList.remove('not-correct');
          errorEmail.classList.add('correct');
          return true;
        }
      }

      function validatePhone(value) {
        if (value.length === 0) {
          errorPhone.innerHTML = 'Bạn phải nhập đầy đủ Số điện thoại !';
          errorPhone.classList.remove('correct');
          errorPhone.classList.add('not-correct');
          return false;
        }
        else if (!/^0[0-9]{9}$/g.test(value.replace(/\s|\-|\./g,''))) {
          errorPhone.innerHTML = 'Số điện thoại không hợp lệ !';
          errorPhone.classList.remove('correct');
          errorPhone.classList.add('not-correct');
          return false;
        }
        else {
          errorPhone.innerHTML = 'Hợp lệ !';
          errorPhone.classList.remove('not-correct');
          errorPhone.classList.add('correct');
          return true;
        }
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateName(name.value);
        validateEmail(email.value);
        validatePhone(phone.value);
        if (validateName(name.value) && validateEmail(email.value) && validatePhone(phone.value)) {
          alert('Success !')
        }
      })
    }
  }
  validation.init();

  const video = {
    init:function() {
      this.video();
    },
    video:function() {
      const videoPopup = document.querySelector('.video-popup');
      if (videoPopup === null) return;
      const openVideo = document.querySelector('.video-button');
      const closeVideo = document.querySelector('.video-close');
      const overlayVideo = document.querySelector('.video-overlay');

      openVideo.addEventListener('click', () => {
        videoPopup.classList.add('active');
      })
      closeVideo.addEventListener('click', () => {
        videoPopup.classList.remove('active');
      })
      overlayVideo.addEventListener('click', () => {
        videoPopup.classList.remove('active');
      })
    }
  }
  video.init();

  const owl = {
    init: function () {
      this.slider();
    },
    slider: function () {
      $('.owl-carousel.client-items').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        autoplay: true,
        responsive: {
          0: {
            items: 2
          },
          600: {
            items: 3
          },
          1000: {
            items: 5
          }
        }
      })

      $('.owl-carousel.testimonial-main').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      })
    }
  }
  owl.init();
}