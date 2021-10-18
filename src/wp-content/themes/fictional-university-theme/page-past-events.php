<?php 
get_header();
pageBanner(array(
    'title' => 'Past Events',
    'subtitle' => 'A recap of our past events.',
  ));
?>
<div class="container container--narrow page-section">
    <?php
    $today = date('Ymd');
    $query = new WP_Query(array(
        'paged' => get_query_var('paged', 1),
        'post_type' => 'event',
        'meta_key' => 'event_date',
        'orderby' => 'meta_value_num',
        'meta_query' => array(
            'key' => 'event_date',
            'compare' => '<',
            'value' => $today,
            'type' => 'numeric'
        )
    ));
    ?>
    <?php while ($query->have_posts()) : ?>
        <?php $query->the_post(); ?>
        <?php get_template_part('template-parts/content-event'); ?>
    <?php endwhile; ?>
    <?php echo paginate_links(array(
        'total' => $query->max_num_pages
    )) ?>
</div>

<?php get_footer(); ?>