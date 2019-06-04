chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.executeScript(tabId, {
    code: `
      var classList = {id: "", tracker: "", status: "", subject: ""}
      var dailyReport = {
        today: [],
        nextday: []
      }

      $(".issues thead tr").prepend("<th>Select Tickets</th>")
      $(".hascontextmenu")
        .prepend("<td><button class='to-day-plan' data-type='today'>ToDay</button><button class='next-plan' data-type='next-day'>NextPlan</button></td>");

      function getDataOnDom(){
        var $this  = this
        var $parenrThis = this.closest(".hascontextmenu");

        Object.keys(classList).forEach(function(key){
          var $keyElement = $parenrThis.find("td."+ key);
          var keyVal = $keyElement.text();

          if(key == "id")
            var keyVal = $keyElement.children().text();
          localStorage.setItem(key, keyVal);
        });



        var result = {
          id: localStorage.getItem("id"),
          tracker: localStorage.getItem("tracker"),
          subject: localStorage.getItem("subject"),
          status: localStorage.getItem("status")
        }

        if($this.data("type") == "today"){
          dailyReport.today.push(result)
        }else{
          dailyReport.nextday.push(result)
        }

        localStorage.setItem("dailyReport", JSON.stringify(dailyReport))
      }

      $(".next-plan, .to-day-plan").on("click", function(event){
        event.preventDefault();
        console.log($(this).data("type"))
        getDataOnDom.call($(this));
        console.log(localStorage.getItem("id"), localStorage.getItem("subject"), localStorage.getItem("tracker") , localStorage.getItem("status"))
      });

      // send data and recived data in chrome.runtime.onMessage.addListener below
      // chrome.runtime.sendMessage({
      //   type: 'next',
      //   data: {
      //     url: $item_el.find('.subject a').attr('href'),
      //     title: $item_el.find('.subject a').text(),
      //     status: $item_el.find('.status').text(),
      //   }
      // });
    `
  });
});

chrome.runtime.onMessage.addListener(
  function(response, sender, sendResponse){

})
