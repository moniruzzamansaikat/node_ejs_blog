// markdown editor
const element = document.getElementById("create_post_editor");
let simplemde;
if (element) simplemde = new SimpleMDE({ element });

// handle post tags input
const $post_tags_input = $("input[name='post_tags']");
$($post_tags_input).tagsinput({
  allowDuplicates: false,
  maxTags: 4,
});

// submit post
const $post_title_input = $("input[name='post_title']");
const $publish_button = $("button#publish_button");
$($publish_button).on("click", function () {
  const tags = $($post_tags_input).val();
  const title = $($post_title_input).val();
  const post_body = simplemde.value();

  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      post_body,
      tags,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        location.replace("/");
      }
    });
});

// show markdown to html
const mdConverter = new showdown.Converter();
const mdContent = document.querySelector("div.md_container");
const html = mdConverter.makeHtml(mdContent.innerHTML);
mdContent.innerHTML = html;
