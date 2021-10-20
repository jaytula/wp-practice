<?php

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'universitySearchResults'
    ));
}

function universitySearchResults($data)
{
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

    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();

        $resultsKey = 'generalInfo';
        switch (get_post_type()) {
            case 'professor':
                $resultsKey = 'professors';
                break;
            case 'program':
                $resultsKey = 'programs';
                break;
            case 'event':
                $resultsKey = 'events';
                break;
            case 'campus':
                $resultsKey = 'campuses';
                break;
        }

        $current = array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'postType' => get_post_type(),
            'authorName' => get_the_author(),
        );

        if(get_post_type() == 'professor') {
            $current['image'] = get_the_post_thumbnail_url(0, 'professorLandscape');
        }

        if(get_post_type() == 'event') {
            $event_date = new DateTime(get_field('event_date'));

            $current['month'] = $event_date->format('M');
            $current['day'] = $event_date->format('d');
            $current['description'] = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18);
        }
        array_push($results[$resultsKey], $current);
    }
    return $results;
}

add_action('rest_api_init', 'universityRegisterSearch');
