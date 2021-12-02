<?php

add_action('rest_api_init', 'universityLikeRoutes');

function universityLikeRoutes() {
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST',
        'callback' => 'createLike',
    ));

    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE',
        'callback' => 'deleteLike',
    ));
}

function createLike($data) {
  if(!is_user_logged_in()) {
    die("Only logged in users can create a like.");
    return;
  }

  $professor_id = sanitize_text_field($data['professorId']);

  $existsQuery = new WP_Query(array(
    'author' => get_current_user_id(),
    'post_type' => 'like',
    'meta_query' => array(
      array(
        'key' => 'liked_professor_id',
        'compare' => '=',
        'value' => $professor_id,
      )
    )
  ));

  if($existsQuery->found_posts || get_post_type($professor_id) !== 'professor') {
    die("Invalid professor id");
    return;
  }

  $post_id = wp_insert_post(array(
    'post_type' => 'like',
    'post_status' => 'publish',
    'post_title' => 'Second PHP Create Post Test',
    'meta_input' => array(
      'liked_professor_id' => $professor_id
    )
  ));

  return $post_id;
}

function deleteLike() {
  return 'Thanks for trying to delete a like';
}