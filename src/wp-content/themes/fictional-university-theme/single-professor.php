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
        <div class="generic-content"><?php the_content() ?></div>
        <?php $related_programs = get_field('related_programs'); ?>
        <?php if($related_programs): ?>
        <hr class="section-break">
        <h2 class="headline headline--medium">Subjects(s) Taught</h2>
        <ul class="link-list min-list">
            <?php foreach ($related_programs as $program) : ?>
                <li><a href="<?= get_the_permalink($program) ?>"><?= get_the_title($program) ?></a></li>
            <?php endforeach; ?>
        </ul>
        <?php endif; ?>
    </div>
<?php endwhile; ?>

<?php get_footer(); ?>