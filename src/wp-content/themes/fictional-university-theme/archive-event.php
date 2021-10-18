<?php 

get_header();
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'See what is going on in our world',
));
?>

<div class="container container--narrow page-section">
    <?php while (have_posts()) : ?>
        <?php the_post(); ?>
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
    <?php echo paginate_links() ?>
    <hr class="section-break">
    <p>Looking for a recap of past events? <a href="<?= site_url('past-events') ?>">Check out our past events archive</a>.
</div>

<?php get_footer(); ?>