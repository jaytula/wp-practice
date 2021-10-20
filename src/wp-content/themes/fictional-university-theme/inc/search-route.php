<?php

function universityRegisterSearch() {
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_Server::READABLE,       
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data) {
    $mainQuery = new WP_Query(array(
      'post_type' => array('post', 'page', 'professor', 'program', 'campus', 'event'),
      's' => sanitize_text_field($data['term'])
    ));

    $results = array(
      'generalInfo' => array(),
      'professors' => array(),
      'programs' => array(),
      'events' => array(),
      'campuses' => array()
    );

    while($mainQuery->have_posts()) {
      $mainQuery->the_post();

      $resultsKey = 'generalInfo';
      switch(get_post_type()) {
        case 'professor': $resultsKey = 'professors'; break;
        case 'program': $resultsKey = 'programs'; break;
        case 'event': $resultsKey = 'events'; break;
        case 'campus': $resultsKey = 'campuses'; break;

      }

      array_push($results[$resultsKey], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'postType' => get_post_type(),
          'authorName' => get_the_author(),
      ));
    }
    return $results;
}

add_action('rest_api_init', 'universityRegisterSearch');