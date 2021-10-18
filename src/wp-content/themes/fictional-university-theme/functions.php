<?php

function pageBanner($args=NULL)
{ 
  $title = $args['title'] ?? get_the_title();
  $subtitle = $args['subtitle'] ?? get_field('page_banner_subtitle');
  $photo_url = $args['photo'] ?? get_theme_file_uri('/images/ocean.jpg');
  if(!$args['photo']) {
    $page_banner_image = get_field('page_banner_image_background');
    if($page_banner_image) {
      $photo_url = $page_banner_image['sizes']['pageBanner'];
    }
  }
  ?>
  <div class="page-banner">
    <?php $page_banner_image = get_field('page_banner_image_background'); ?>
    <div class="page-banner__bg-image" style="background-image: url(<?= $photo_url ?>)"></div>
    <div class="page-banner__content container container--narrow">
      <h1 class="page-banner__title"><?= $title ?></h1>
      <div class="page-banner__intro">
        <p><?= $subtitle ?></p>
      </div>
    </div>
  </div>
<?php }

function university_files()
{
  wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array(
    'jquery'
  ), '1.0', true);
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
  wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
}


add_action('wp_enqueue_scripts', 'university_files');

function university_features()
{
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('professorLandscape', 400, 260, true);
  add_image_size('professorPortrait', 480, 650, true);
  add_image_size('pageBanner', 1500, 350, true);
}
add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query)
{
  if (!is_admin() && is_post_type_archive('event') && is_main_query()) {
    $today = date('Ymd');
    $query->set('posts_per_page', 2);
    $query->set('meta_key', 'event_date');
    $query->set('orderby', 'meta_value_num');
    $query->set('order', 'ASC');
    $query->set('meta_query', array(
      'key' => 'event_date',
      'compare' => '>=',
      'value' => $today,
      'type' => 'numeric'
    ));
  }

  if (!is_admin() && is_post_type_archive('program') && is_main_query()) {
    $query->set('posts_per_page', -1);
    $query->set('orderby', 'title');
    $query->set('order', 'ASC');
  }
}
add_action('pre_get_posts', 'university_adjust_queries');
