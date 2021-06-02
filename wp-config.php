 
<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_bus' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'javelin93' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ')!|{rAoISG;JnqiT%3OKm]0(Nqx24t11z?Jz=,G{ABwJH}5!X*<1tA=BpD:OWo4b' );
define( 'SECURE_AUTH_KEY',  'W/-~hWHGuF@JNSP0nEZ+(j{5F/pL7q9TWUN1okiSF`{VU1A|q3 kd?|J|])h<5Ws' );
define( 'LOGGED_IN_KEY',    '{V2 c2u*5,krCW_RzlivuVcPAlBQQP>*?]LG~`}T?KEzJHWB+~bl }J>,q%-/6*I' );
define( 'NONCE_KEY',        'tAtUXtN+jdZdC13D?srKHme(6$ao]FJ|M%XUEFjMFT1X>: Au4 f?+cR*F)H*Q>}' );
define( 'AUTH_SALT',        'iv.DKIY-S{?<8!pD,bMJJ!Iuf-[PwlHaV6[Iy$az->Bz3Ft=6]0/o(1+Sb4QOixn' );
define( 'SECURE_AUTH_SALT', 'p/]X6&?u=YBQBRgp[Pu.[xfuW,a+^axsT(hh*q/-2aH)cdkRrEITY#k*sh/{3iNP' );
define( 'LOGGED_IN_SALT',   'Ve/b4N}y>8TtW.]lJy{zhqx$+][KtMo~-54z#PJdSf*`1~!*Lox#<z*+#l-4.nl,' );
define( 'NONCE_SALT',       'ZH<R93.>;Mx]Liukvbhwpg9oLw[6P?;~O.Mf5}s~u(^mh#,pY.LoB!8Wsl|*:};H' );
//define('WP_ALLOW_REPAIR', true);
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_bus';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
