---
title: "Something went wrong"
summary: "website"
date: "2021-2022"
featured_image: "assets/images/somethingwentwrong-1.jpg"
---

In the work, viewers see a monitor displaying a rendering screen. To the right of the monitor, a printed apology notice is attached to the wall. The note reads:

**"I'm sorry. The encoding has not been completed, so you cannot watch the video yet. You can watch the video as soon as the encoding is complete."**

However, if you look closely at the rendering screen, you may notice something strange — the estimated rendering time shows that several days remain. In reality, the screen is not an actual rendering process but a visual simulation created using HTML.

The rendering start time corresponds to the opening time of the exhibition, and the completion time is set to the closing time of the exhibition. In other words, no matter how long the audience waits, they will never be able to watch the video. Even if someone stays until the very end of the exhibition, due to a final twist, the video will still remain inaccessible.

**Something went wrong!**

![Exhibition view](../assets/images/somethingwentwrong-1.jpg)
*Exhibition view*

<div class="container">
    <iframe class="responsive-iframe"
        src="https://yellow-moonlight.github.io/somethingwentwrong/" allowfullscreen></iframe>
</div>
*Screen Simulation Example:<br>
In this screen, the rendering start date is set to December 26, 2022,<br> and the rendering end date is set to September 30, 2099.<br>
The elapsed rendering time is <span id="overt"></span>,<br>
and the remaining rendering time is <span id="remaint"></span>,<br>
with <span id="percent"></span>% completed.*

![Something went wrong screen](../assets/images/somethingwentwrong-2.jpg)
*When the exhibition ends and the remaining rendering time reaches zero, the screen changes as shown in the image above.*

<script>
  CountDownTimer('12/26/2022 09:00 AM', '9/30/2099 5:00 PM', 'percent', 'overt', 'remaint');

  function CountDownTimer(startDateStr, endDateStr, percentId, elapsedId, remainingId) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    function showRemaining() {
      const now = new Date();

      const totalDuration = end - start;
      const timeElapsed = now - start;
      const timeRemaining = end - now;

      if (timeRemaining < 0) {
        document.getElementById(percentId).innerText = "100.00000";
        document.getElementById(elapsedId).innerText = formatTime(totalDuration);
        document.getElementById(remainingId).innerText = "0 days 0 hours 0 minutes 0 seconds";
        clearInterval(timer);
        return;
      }

      // 계산: 경과 및 남은 시간
      document.getElementById(elapsedId).innerText = formatTime(timeElapsed);
      document.getElementById(remainingId).innerText = formatTime(timeRemaining);

      // 퍼센트 계산
      const percent = (timeElapsed / totalDuration) * 100;
      document.getElementById(percentId).innerText = percent.toFixed(5);
    }

    function formatTime(milliseconds) {
      const days = Math.floor(milliseconds / day);
      const hours = Math.floor((milliseconds % day) / hour);
      const minutes = Math.floor((milliseconds % hour) / minute);
      const seconds = Math.floor((milliseconds % minute) / second);
      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }

    const timer = setInterval(showRemaining, 1000);
  }
</script>
