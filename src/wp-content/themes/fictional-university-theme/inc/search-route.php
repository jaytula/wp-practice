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
        );

        if (get_post_type() == 'post' || get_post_type() == 'page') {
            $current['postType'] = get_post_type();
            $current['authorName'] = get_the_author();
        }

        if (get_post_type() == 'program') {
            $relatedCampuses = get_field('related_campus');

            if($relatedCampuses) {
              foreach($relatedCampuses as $campus) {
                array_push($results['campuses'], array(
                  'title' => get_the_title($campus),
                  'permalink' => get_the_permalink($campus),
                ));
              }
            }
            $current['id'] = get_the_ID();
        }

        if (get_post_type() == 'professor') {
            $current['image'] = get_the_post_thumbnail_url(0, 'professorLandscape');
        }

        if (get_post_type() == 'event') {
            $event_date = new DateTime(get_field('event_date'));

            $current['month'] = $event_date->format('M');
            $current['day'] = $event_date->format('d');
            $current['description'] = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18);
        }
        array_push($results[$resultsKey], $current);
    }
    wp_reset_postdata();

    if ($results['programs']) {
        $programsMetaQuery = array('relation' => 'OR');
        foreach ($results['programs'] as $item) {
            $programsMetaQuery[] = array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => "\"{$item['id']}\""
            );
        }

        $programRelationshipQuery = new WP_Query(array(
            'post_type' => array('professor', 'event'),
            'meta_query' => $programsMetaQuery,
        ));

        while ($programRelationshipQuery->have_posts()) {
            $programRelationshipQuery->the_post();
            $current = array();
            if (get_post_type() == 'event') {
              $event_date = new DateTime(get_field('event_date'));
  
              $current['title'] = get_the_title();
              $current['permalink'] = get_the_permalink();
              $current['month'] = $event_date->format('M');
              $current['day'] = $event_date->format('d');
              $current['description'] = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18);

              array_push($results['events'], $current);
            }
            if (get_post_type() == 'professor') {
              $current = array(
                  'title' => get_the_title(),
                  'permalink' => get_the_permalink(),
                  'image' => get_the_post_thumbnail_url(0, 'professorLandscape')
              );
              array_push($results['professors'], $current);
            }
        }
    

        $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));
        $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));
        $results['campuses'] = array_values(array_unique($results['campuses'], SORT_REGULAR));
    }        

    return $results;
}

add_action('rest_api_init', 'universityRegisterSearch');
