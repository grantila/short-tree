import { RBTree } from'bintrees'


export type Compare< T > = ( a: T, b: T ) => number;

function makeArrayCompare< T >( cmp: Compare< T > ): Compare< Array< T > >
{
	return function( a, b )
	{
		const lenA = a.length;
		const lenB = b.length;
		const minLength = Math.min( lenA, lenB );
		for ( let i = 0; i < minLength; ++i )
		{
			const diff = cmp( a[ i ], b[ i ] );
			if ( diff === 0 )
				continue;
			return diff;
		}
		return lenA > lenB
			? 1
			: lenA < lenB
			? -1
			: 0;
	}
}

function arrayStartsWith< T >(
	haystack: Array< T >,
	needle: Array< T >,
	cmp: Compare< T >
)
{
	if ( haystack.length < needle.length )
		return false;
	for ( let i = 0; i < needle.length; ++i )
		if ( cmp( haystack[ i ], needle[ i ] ) !== 0 )
			return false;
	return true;
}

export class ShortTree< T > extends RBTree< Array< T > >
{
	constructor(
		private cmp: Compare< T >,
		private arrayCmp = makeArrayCompare( cmp )
	)
	{
		super( arrayCmp );
	}

	private arrayStartsWith( haystack: Array< T >, needle: Array< T > )
	{
		return arrayStartsWith( haystack, needle, this.cmp );
	}

	insert( path: Array< T > )
	{
		// Find shorter path, if so, do nothing
		const iter = this.lowerBound( path );
		const data = iter.data( );
		if ( data )
		{
			const cmp = this.arrayCmp( data, path );
			if ( cmp === 0 )
				return false;
			else if ( this.arrayStartsWith( data, path ) )
				this.chopOff( path );
		}

		const prev = this.lowerBound( path ).prev( );
		if ( prev && this.arrayStartsWith( path, prev ) )
			return false;

		return super.insert( path );
	}

	private chopOff( path: Array< T > )
	{
		const iter = this.lowerBound( path );
		const found: Array< Array< T > > = [ ];
		do
		{
			const data = iter.data( );
			if ( data && this.arrayStartsWith( data, path ) )
				found.push( data );
			else
				break;
			iter.next( );
		} while ( true );

		for ( const node of found )
			this.remove( node );

		return found.length > 0;
	}

	values( ): Array< Array< T > >
	{
		const ret: Array< Array< T > > = [ ];
		this.each( node => ret.push( node ) );
		return ret;
	}
}
