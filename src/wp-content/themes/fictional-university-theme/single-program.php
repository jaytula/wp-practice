<?php get_header(); ?>

<?php while (have_posts()) : ?>
    <?php the_post(); ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?= get_theme_file_uri('/images/ocean.jpg') ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title(); ?></h1>
            <div class="page-banner__intro">
                <p>Don't forget to replace me later.</p>
            </div>
        </div>
    </div>
    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program') ?>">
                    <i class="fa fa-home" aria-hidden="true"></i> All Programs</a>
                <span class="metabox__main"><?php the_title() ?></span>
            </p>
        </div>
        <div class="generic-content"><?php the_content() ?></div>
        <?php $professors_query = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'professor',
            'orderby' => 'title',
            'order' => 'ASC',
            'meta_query' => array(
                array(
                    'key' => 'related_programs',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                )
            )
        )); ?>
        
        <?php if($professors_query->have_posts()): ?>
        <hr class="section-break">
        <h2 class="headline headline--medium"><?php the_title(); ?> Professors</h2>
        <ul class="professor-cards">
        <?php while ($professors_query->have_posts()) : ?>
            <?php $professors_query->the_post(); ?>
            <li class="professor-card__list-item">
              <a class="professor-card" href="<?php the_permalink() ?>">
                <img class="professor-card__image" src="<?php the_post_thumbnail_url() ?>">
                <span class="professor-card__name"><?php the_title() ?></span>
              </a>
            </li>
        <?php endwhile; ?>
        </ul>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
        

        <?php $today = date('Ymd'); ?>
        <?php $events_query = new WP_Query(array(
            'posts_per_page' => 2,
            'post_type' => 'event',
            'meta_key' => 'event_date',
            'orderby' => 'meta_value_num',
            'order' => 'ASC',
            'meta_query' => array(
                array(
                    'key' => 'event_date',
                    'compare' => '>=',
                    'value' => $today,
                    'type' => 'numeric',
                ),
                array(
                    'key' => 'related_programs',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                )
            )
        )); ?>
        
        <?php if($events_query->have_posts()): ?>
        <hr class="section-break">
        <h2 class="headline headline--medium">Upcoming <?= get_the_title() ?> Events</h2>
        <?php while ($events_query->have_posts()) : ?>
            <?php $events_query->the_post(); ?>
            <div class="event-summary">
                <?php
                $event_date = new DateTime(get_field('event_date'));
                ?>
                <a class="event-summary__date t-center" href="#">
                    <span class="event-summary__month"><?= $event_date->format('M')  ?></span>
                    <span class="event-summary__day"><?= $event_date->format('d') ?></span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h5>
                    <?php $excerpt = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18); ?>
                    <p><?php echo $excerpt ?> <a href="<?php the_permalink() ?>" class="nu gray">Learn more</a></p>
                </div>
            </div>
        <?php endwhile; ?>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
        
    </div>
<?php endwhile; ?>

<?php get_footer(); ?>