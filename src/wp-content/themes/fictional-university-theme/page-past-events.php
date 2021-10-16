<?php get_header(); ?>

<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?= get_theme_file_uri('/images/ocean.jpg') ?>)"></div>
    <div class="page-banner__content container container--narrow">
        <!-- <?php $title = is_category() ? single_cat_title('', false) : 'Posts by ' . get_the_author(); ?> -->
        <?php $title = get_the_archive_title() ?>
        <h1 class="page-banner__title">Past Events</h1>
        <div class="page-banner__intro">
            A recap of our past events.
        </div>
    </div>
</div>

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
        <?php $event_date = new DateTime(get_field('event_date')); ?>
        <div class="event-summary">
            <a class="event-summary__date t-center" href="#">
                <span class="event-summary__month"><?= $event_date->format('M') ?></span>
                <span class="event-summary__day"><?= $event_date->format('d') ?></span>
            </a>
            <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
                <p><?php echo wp_trim_words(get_the_content(), 18) ?> <a href="<?php the_permalink() ?>" class="nu gray">Learn more</a></p>
            </div>
        </div>
    <?php endwhile; ?>
    <?php echo paginate_links(array(
        'total' => $query->max_num_pages
    )) ?>
</div>

<?php get_footer(); ?>